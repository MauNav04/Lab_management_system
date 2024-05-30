import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Actives from "./Actives";
import useAuth from '../../hooks/useAuth';


function ProfessorBody() {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    //List with all the solicitudes that the students have sent
    const [solicitudes, setSolicitude] = useState([])

    const API_URL = 'http://localhost:5095'
    const PUT_APPROVE_SOLIC = '/SolicitudActivo/AprobarSolicitudActivoId?id='

    useEffect(() => {
        const INFO_LAB_EP = '/Laboratorio/MostrarInformacionLab?nombreLab='

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        async function fetchPosts() {
            const response = await fetch('http://localhost:5095/Profesor/SolicitudesPendientes?correoProfesor=' + auth.user, requestOptions)
            //const textData = await response.text();
            const resData = await response.json();
            console.log(resData)
            //console.log('leng: ' + resData.length)
            //const resData = await JSON.parse(response); // Try parsing the response data
            setSolicitude(resData)
            console.log('USER: ', auth.user)
        }

        fetchPosts();
    }, [])

    async function approveSolic(id, placa) {
        const aprovalOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
        };

        try {
            await fetch(API_URL + PUT_APPROVE_SOLIC + id + '&placa=' + placa, aprovalOptions)
            console.log('SOLICITUDE APPROVED')
        } catch (error) {
            console.log('Error:', error)
        }
    }

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

    function handleDelete(id, placa) {
        setSolicitude(solicitudes.filter(solic => solic.IdActivo !== id));
        approveSolic(id, placa)
    };

    return <>

        <h2>Solicitudes para préstamo de activos</h2>

        {solicitudes.length > 0 ? (
            <ul>
                {solicitudes.map((solic) => <Actives
                    id={solic.IdActivo}
                    nombre={solic.NombreEstudiante}
                    apellido={solic.Apellido1Estudiante + ' ' + solic.Apellido2Estudiante}
                    tipo={solic.Tipo}
                    placa={solic.PlacaActivo}
                    onDelete={handleDelete}
                />)}
            </ul>
            // <ul>
            //     {solicitudes.map((solic) => solic)}
            // </ul>
        ) :
            <div>
                <p>No hay solicitudes de préstamo pendientes.</p>
            </div>}

        <button onClick={goBack}>Volver</button>
    </>
}

export default ProfessorBody;