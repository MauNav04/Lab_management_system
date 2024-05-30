import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Actives from "../profesor/Actives";
import classes from '../profesor/NewPasswordView.module.css';
import { Link } from "react-router-dom";


function OperatorLoan() {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    //List with all the solicitudes that the students have sent
    const [solicitudes, setSolicitude] = useState([])

    function activeReqHadler(resData) {
        for (let i = 0; i < resData.length; i++) {
            //const element = resData[i];
            console.log(resData[i])
            setSolicitude((solics) => [resData[i], ...solics]);
        }
    }

    function newSolicHandler(event) {
        setSolicitude((currentSolics) => ["New Solicitude", ...currentSolics])
        console.log(solicitudes)
    }

    function noseHandler(e) {
        console.log(solicitudes)
    }

    function handleDelete(id) {
        setSolicitude(solicitudes.filter(solic => solic.IdActivo !== id));
    };

    return <>

        <div className={classes.box}>
            <h2>Opciones para préstamo de activos</h2>

            <Link to='/operador/prestamo-profesor'>Solicitar préstamo a profesor</Link> <br />
            <Link to='/operador/prestamo-estudiante'>Solicitar préstamo a estudiante</Link> <br />
            <Link to='/operador/retornar-activo'>Devolución de activo</Link> <br />

            <button onClick={goBack}>Volver</button>
        </div>
    </>
}

export default OperatorLoan;