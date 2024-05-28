import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ActiveObj from "./ActiveObj";
import classes from './Operator.module.css'

function ReturnLoan() {
    const API_URL = 'http://localhost:5095'
    const COMPLETE_ACTIVE_LIST = '/Profesor/MostrarActivosDisponibles'
    const ACTIVES_ONLOAN = '/Profesor/MostrarActivosEnPrestamos'
    const END_LOAN = '/SolicitudActivo/FinalizarPrestamo'

    const [loanedList, setLoanedList] = useState([]);

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    async function fetchActives() {
        let detailedLoanedActives = [];

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        const actives = await fetch(API_URL + COMPLETE_ACTIVE_LIST, requestOptions)
        const jsonActives = await actives.json();
        console.log(jsonActives)

        const loanedActives = await fetch(API_URL + ACTIVES_ONLOAN, requestOptions)
        const jsonLoanedActives = await loanedActives.json();
        console.log(jsonLoanedActives)
        //setActiveList(resData)

        for (let i = 0; i < jsonLoanedActives.length; i++) {
            const loanedActive = jsonLoanedActives[i];
            for (let j = 0; j < jsonActives.length; j++) {
                const active = jsonActives[j];

                if (loanedActive.PlacaActivo === active.Placa) {
                    active.loanID = loanedActive.Id;
                    detailedLoanedActives.push(active)
                    break
                }
            }
        }

        console.log('DETAILS:', detailedLoanedActives);
        setLoanedList(detailedLoanedActives)
    }

    useEffect(() => {
        fetchActives();
    }, [])

    async function returnActive(id, placa) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch(API_URL + END_LOAN + '?id=' + id + '&placa=' + placa, requestOptions)

        alert('The active has been marked as returned.')

        setLoanedList(loanedList.filter(activo => activo.Placa !== placa));
    }

    return <>

        <div>
            <h3> Activos prestados </h3> <br />

            {/* En este punto se están mostrando TODOS los activos, no hay un endopoint que solo muestre activos disponbles realmente
                Hay que llamar a activos en prestamos y restar las listas. */}
            {loanedList.length > 0 ? (
                <ul className={classes.activeList}>
                    {loanedList.map((solic) =>
                        <ActiveObj
                            id={solic.loanID}
                            Tipo={solic.Tipo}
                            Placa={solic.Placa}
                            Marca={solic.Marca}
                            Texto='Devolución'
                            onDelete={returnActive}
                        />
                    )}
                </ul>
            ) :
                <div>
                    <p>Ningún activo ha sido prestado hasta el momento.</p>
                </div>}

        </div>

        <button onClick={goBack}>Volver</button>

    </>
}

export default ReturnLoan;