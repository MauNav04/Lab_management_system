import classes from './LoginAdmin.module.css';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function LoginAdmin() {

    const roles = [100];

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin"

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [retryLogin, setRetryLogin] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');

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

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    correo: user,
                    contraseña: pwd
                })
            };

            const response = await fetch('http://localhost:5095/Ingreso/IngresoAdministrador', requestOptions)
            const textData = await response.text();

            console.log(from)

            if (response.status === 200) {
                setResponseMsg(textData)
                //setSuccess(true);
                console.log(response);
                setAuth({ user, pwd, roles });
                setUser('');
                setPwd('');
                //navigate('/adwda')
                //navigate('/profesores');
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

        }
    }

    return (
        <div>
            <div className={classes.toptobottom}>
                <h1>Inicio de Sesión de Administrador</h1>
            </div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
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
                    Compruebe sus credenciales e intente de nuevo
                </p>

                <p className={classes.actions}>
                    <button>Ingresar</button>
                </p>
            </form>
            <p>
                <Link className="line" to="/">
                    <button>Volver</button>
                </Link>
            </p>
        </div>
    )
}

export default LoginAdmin;