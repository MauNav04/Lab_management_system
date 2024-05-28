import { Link } from "react-router-dom";
import classes from './Home.module.css'
import profSrc from '/src/img/prof.jpg';
import adminSrc from '/src/img/admin.png';
import operatorSrc from '/src/img/operator.png';

function Home() {
    return (
        <div className={classes.background}>


            <div className={classes.managementtools}>
                <h1> Profesores</h1>
                <h2> Requiere Registro previo de un Administrador</h2>
                <h2> Permite al profesor aprobar préstamos y realizar la reservación de un laboratorio</h2>
                <div className={classes.imagecontainer}>
                    <img src={profSrc} alt='None' />
                </div>
                <div>
                    <Link to="/login-profesor">
                        <button className={classes.btn}> Iniciar sesión</button>
                    </Link>
                </div>
            </div>

            <div className={classes.actmanagement}>
                <h1> Administradores</h1>
                <h2> Permite la gestión de laboratorios, activos y profesores</h2>
                <h2> Además de aprobar solicitudes de operadores, reestablecer contraseñas y generar reportes</h2>
                <div className={classes.imagecontainer}>
                    <img src={adminSrc} alt='None' />
                </div>
                <div>
                    <Link to="/login-admin">
                        <button className={classes.btn}> Iniciar sesión</button>
                    </Link>
                </div>
            </div>

            <div className={classes.operators}>
                <h1> Operadores</h1>
                <h2> Permite realizar solicitudes de préstamo de activos, y de reservación de laboratorios</h2>
                <h2> Además de registrar las devoluciones de activos y generar reportes</h2>
                <div className={classes.imagecontainer}>
                    <img src={operatorSrc} alt='None' />
                </div>
                <div>
                    <Link to="/operador/login">
                        <button className={classes.btn}> Iniciar sesión</button>
                    </Link>
                </div>
            </div>


        </div>
    )
}

export default Home;