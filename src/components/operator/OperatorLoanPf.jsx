import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Actives from "../profesor/Actives";
import ActiveObj from "./ActiveObj";
import classes from './Operator.module.css'

function OperatorLoanPf() {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    //List with all the current available actives
    const [activeList, setActiveList] = useState([])

    const API_URL = 'http://localhost:5095'
    const AVAILABLE_ACTIVES = '/Profesor/MostrarActivosDisponibles'

    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        async function fetchActives() {
            const response = await fetch(API_URL + AVAILABLE_ACTIVES, requestOptions)
            const resData = await response.json();
            console.log(resData)
            setActiveList(resData)
        }

        fetchActives();
    }, [])

    function activeReqHandler(resData) {
        for (let i = 0; i < resData.length; i++) {
            console.log(resData[i])
            setSolicitude((solics) => [resData[i], ...solics]);
        }
    }

    function newSolicHandler(event) {
        setSolicitude((currentSolics) => ["New Solicitude", ...currentSolics])
        console.log(solicitudes)
    }

    function handleDelete(placa) {
        setActiveList(activeList.filter(activo => activo.Placa !== placa));
        navigate('/operador/validacion-profesor/' + placa)
    };

    return <>

        <h2>Solicitar activo para un profesor</h2>

        <div>
            <h3>Activos Disponibles</h3>

            {activeList.length > 0 ? (
                <ul className={classes.activeList}>
                    {activeList.map((solic) => <ActiveObj
                        Tipo={solic.Tipo}
                        Placa={solic.Placa}
                        Marca={solic.Marca}
                        Texto='Seleccionar'
                        onDelete={handleDelete}
                    />)}
                </ul>
            ) :
                <div>
                    <p>No hay activos disponibles en este momento.</p>
                </div>}

        </div>
        <button onClick={goBack}>Volver</button>
    </>
}

export default OperatorLoanPf;