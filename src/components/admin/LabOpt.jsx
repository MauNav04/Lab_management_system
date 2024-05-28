import { FaC } from "react-icons/fa6";
import classes from './admin.module.css';

function LabOpt({ Nombre, Capacidad, Computadores, Facilidades, Activos, Horario, onUpdate }) {

    function onUpdateHandler() {
        onUpdate(Nombre)
    }

    return <>
        <li>
            <div>
                <h2>Laboratorio {Nombre}</h2>
                <p>Capacidad: {Capacidad}</p>
                <p>Computadores: {Computadores}</p>
                <div className={classes.middleSect}>
                    <div>
                        <h3>Facilidades:</h3>
                        <div> {Facilidades.map((facility) => {
                            return (
                                <p>{facility}</p>
                            )
                        })}</div>
                    </div>
                    <div>
                        <h3>Activos: </h3>
                        <div className={classes.activos}>
                            {Activos.map((active) => {
                                return <>
                                    <p>Tipo: {active.Tipo}</p>
                                </>
                            })}</div>
                    </div>
                </div>
                <h3>Horario:</h3>
                <div className={classes.horario}>

                    {Horario.length != 0 && Horario.map((horarioDia) => {
                        return <>
                            <div className={classes.horarioDias}>
                                <p>Dia: {horarioDia.Dia}</p>
                                <p>Inicio: {horarioDia.HoraApertura}</p>
                                <p>Cierre: {horarioDia.HoraCierre}</p>
                            </div>
                        </>
                    })}
                </div>
            </div>
            <button onClick={onUpdateHandler} >Actualizar</button>
        </li>
    </>
}

export default LabOpt;