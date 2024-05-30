import classes from '../profesor/LoginPage.module.css';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import md5 from 'md5';
import { set } from 'date-fns';
import CryptoJS from 'crypto-js';

function ProfValidator() {

    const { auth } = useAuth();

    const { placaactivo } = useParams();

    const location = useLocation();
    const from = location.state?.from?.pathname || '/operador/prestamo-profesor'

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [retryLogin, setRetryLogin] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const API_URL = 'http://localhost:5095'
    const NEW_ACTIVE_SOLIC = '/SolicitudActivo/AgregarSolicitudActivo'
    const GET_TEACHER_SOLICS = '/Profesor/SolicitudesPendientes?correoProfesor='
    const PUT_APPROVE_SOLIC = '/SolicitudActivo/AprobarSolicitudActivoId?id='

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            correoEstudiante: "none@",
            nombreEstudiante: "none",
            apellido1Estudiante: "none",
            apellido2Estudiante: "none",
            placaActivo: placaactivo,
            correoProfesor: user,
            correoOperador: auth.user
        })
    };

    async function newActiveSolic(resistor) {
        try {
            await fetch(API_URL + NEW_ACTIVE_SOLIC, requestOptions)
            console.log('New Active Solic Set')
        } catch (error) {
            console.log('Error:', error)
        }
    }

    async function getSolicId(resistor) {
        try {
            const response = await fetch(API_URL + GET_TEACHER_SOLICS + user);
            const resData = await response.json();
            console.log('RESPONSEEE', resData[resData.length - 1]);
            return (resData[resData.length - 1])
        } catch (error) {
            console.log('Error:', error)
        }
    }

    async function approveSolic(resistor) {
        const aprovalOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
        };

        try {
            console.log('INPUT: ', resistor)
            await fetch(API_URL + PUT_APPROVE_SOLIC + resistor.IdActivo + '&placa=' + placaactivo, aprovalOptions)
            console.log('SOLICITUDE APPROVED')
        } catch (error) {
            console.log('Error:', error)
        }
    }


    //Ya hasta aqui se logra generar una nueva solicitud de activo para un profesor, falta hacer lo mismo pero para un estudiante
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    correo: user,
                    contraseña: CryptoJS.MD5(pwd).toString()
                })
            };

            const response = await fetch('http://localhost:5095/Ingreso/IngresoProfesor', requestOptions)
            const textData = await response.text();

            console.log(from)

            if (response.status === 200) {
                //setResponseMsg(textData);
                //setSuccess(true);
                const req1 = await newActiveSolic(response);
                const req2 = await getSolicId(req1);
                await approveSolic(req2);
                console.log('Logged USER', auth.user);
                console.log('USER', user);
                console.log('RESP', response);
                setUser('');
                setPwd('');
                navigate(from, { replace: true });
            } else {
                setResponseMsg(textData)
                setRetryLogin(true)
            }
            //const resData = await response.json();
            //console.log(resData);
            console.log(textData); // Log the response data
            //const resData = await JSON.parse(response); // Try parsing the response data

        } catch (err) {
            console.log('Error:', err);

        }
    }

    return (
        <div>
            <div className={classes.toptobottom}>
                <h3>Validación de Cuenta</h3>
            </div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <form className={classes.form}>
                <p>
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        required
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                    />
                </p>
                <p>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                    />
                </p>

                <p>
                    *Indique las credenciales del profesor que requiere el activo.
                </p>

                <p id="loginnote" className={retryLogin ? classes.instructions : classes.hide}>
                    Usuario Incorrecto
                </p>

                <div className={classes.buttonSect}>
                    <button onClick={goBack}>Volver</button>
                    <button onClick={handleSubmit}>Validar</button>
                </div>
            </form>
        </div>
    )
}

export default ProfValidator;