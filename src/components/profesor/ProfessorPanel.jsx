import { Link } from 'react-router-dom';

function ProfessorPanel() {

    return <>
        <div>
            <Link to='/prestamo-activos'>Préstamo de activos</Link> <br />
            <Link to='/reserva-lab'>Reservar Laboratorio</Link> <br />
            <Link to='/cambiar-clave'>Cambiar contraseña</Link> <br />
            <Link to='/testing'>testLink</Link> <br />
            <Link to='/logout'> Cerrar Sesión </Link>
        </div>
    </>
}

export default ProfessorPanel;