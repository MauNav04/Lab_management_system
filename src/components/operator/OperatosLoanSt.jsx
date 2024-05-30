import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Actives from "../profesor/Actives";
import ActiveObj from "./ActiveObj";
import classes from './Operator.module.css'
import { useForm, Controller } from "react-hook-form"
import useAuth from '../../hooks/useAuth';

function OperatorLoanSt() {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const { auth } = useAuth();

    //List with all the current available actives
    const [activeList, setActiveList] = useState([])

    //Boolean to display a form to send an active solic
    const [showTeacherInput, setShowTeacherInput] = useState(false);
    //Once the user selects an active, the plaque is stored
    const [selectedPlaque, setSelectedPlaque] = useState('');

    const API_URL = 'http://localhost:5095'
    const AVAILABLE_ACTIVES = '/Profesor/MostrarActivosDisponibles'
    const NEW_ACTIVE_SOLIC = '/SolicitudActivo/AgregarSolicitudActivo'

    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        formState: { errors },
    } = useForm();

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

    function handleRequest(placa) {
        // setActiveList(activeList.filter(activo => activo.Placa !== placa));
        // navigate('/operador/validacion-profesor/' + placa)
        setShowTeacherInput(!showTeacherInput);
        setSelectedPlaque(placa)
    };

    async function newActiveSolic(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                correoEstudiante: data.correo,
                nombreEstudiante: data.nombre,
                apellido1Estudiante: data.apellido1,
                apellido2Estudiante: data.apellido2,
                placaActivo: selectedPlaque,
                correoProfesor: data.correoProf,
                correoOperador: auth.user
            })
        };

        try {
            await fetch(API_URL + NEW_ACTIVE_SOLIC, requestOptions)
            console.log('New Active Solic Set')
        } catch (error) {
            console.log('Error:', error)
        }
    }

    const onSubmit = (data) => {
        newActiveSolic(data)
        setShowTeacherInput(false)
        reset({
            correo: '',
            nombre: '',
            apellido1: '',
            apellido2: '',
            correoProf: ''
        })
    };

    return <>
        <h2>Solicitar activo para un estudiante</h2>

        <div>
            <h3>Activos Disponibles</h3>

            {/* En este punto se están mostrando TODOS los activos, no hay un endopoint que solo muestre activos disponbles realmente
            Hay que llamar a activos en prestamos y restar las listas. */}
            {activeList.length > 0 ? (
                <ul className={classes.activeList}>
                    {activeList.map((solic) => <ActiveObj
                        Tipo={solic.Tipo}
                        Placa={solic.Placa}
                        Marca={solic.Marca}
                        Texto='Seleccionar'
                        onDelete={handleRequest}
                    />)}
                </ul>
            ) :
                <div>
                    <p>No hay activos disponibles en este momento.</p>
                </div>}
        </div>

        {showTeacherInput && (
            <div name="defineTeacher">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="correo">Correo Estudiante: </label>
                    <input
                        id="correo"
                        {...register("correo")} />
                    <label htmlFor="nombre">Nombre Estudiante: </label>
                    <input
                        id="nombre"
                        {...register("nombre")} />
                    <label htmlFor="apellido1">Primer Apellido: </label>
                    <input
                        id="apellido1"
                        {...register("apellido1")} />
                    <label htmlFor="apellido2">Segundo Apellido: </label>
                    <input
                        id="apellido2"
                        {...register("apellido2")} />
                    <label htmlFor="correoProf">Correo de profesor que aprueba el préstamo: </label>
                    <input
                        id="correoProf"
                        {...register("correoProf")} />
                    <input type="submit" />
                </form>

            </div>
        )}
        <button onClick={goBack}>Volver</button>
    </>
}

export default OperatorLoanSt;