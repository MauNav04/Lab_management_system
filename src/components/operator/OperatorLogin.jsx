import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import md5 from 'md5';
import classes from '../profesor/LoginPage.module.css';


function OperatorLogin() {

    const API_URL = 'http://localhost:5095'
    const LOGIN_OPERADOR_EP = '/Ingreso/IngresoOperador'

    const roles = [101];

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = "/operador/home"

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [retryLogin, setRetryLogin] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(user, pwd, roles)
            console.log('Password: ', pwd);
            console.log('Encypted:', md5(pwd));

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    correo: user,
                    contraseña: pwd
                })
            };

            const response = await fetch(API_URL + LOGIN_OPERADOR_EP, requestOptions)
            const textData = await response.text();

            console.log(response.status)

            if (response.status === 200) {
                //setResponseMsg(textData);
                //setSuccess(true);
                console.log(response);
                setAuth({ user, pwd, roles });
                console.log('NAVIGATING')
                setUser('');
                setPwd('');
                //navigate('/adwda')
                //navigate('/profesores');
                navigate(from);
            } else {
                console.log('NOT NAVIGATING')
                setResponseMsg(textData)
                setRetryLogin(true)
            }
            //const resData = await response.json();
            //console.log(resData);
            console.log(textData); // Log the response data
            //const resData = await JSON.parse(response); // Try parsing the response data

        } catch (err) {

        }
    }

    return (
        <div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <h1>Iniciar Sesión Operador</h1>
            <form onSubmit={handleSubmit} className={classes.form}>
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

                <p id="loginnote" className={retryLogin ? classes.instructions : classes.hide}>
                    Usuario Incorrecto
                </p>

                <p className={classes.actions}>
                    <button>Ingresar</button>
                </p>
            </form>
            <p>
                No tiene cuenta?<br />
                <span className="line">
                    {/*Link para enrutar aqui*/}
                    <a href="#">Registrarse</a>
                </span>
            </p>
        </div>
    )
}

export default OperatorLogin;