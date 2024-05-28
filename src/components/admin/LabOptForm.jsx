import { FaC } from "react-icons/fa6";
import classes from './admin.module.css';
import { useForm } from "react-hook-form"
import { useEffect, useState, useRef } from "react";


function LabOptForm({ Nombre, Capacidad, Computadores, Facilidades, Activos, Horario, onUpdate }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const API_URL = 'http://localhost:5095';
    const NEW_FACILITY = '/Facilidad/AgregarFacilidadLab';

    const [facUpdate, setFacUpadate] = useState(false);
    const [actUpdate, setActUpadate] = useState(false);
    const [facilityInput, setFacilityInput] = useState('');
    const [activeInput, setActiveInput] = useState('');

    const inputRef = useRef(null);

    async function postFacility() {
        const requestBody = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "nombreLab": Nombre,
                "nombreFacilidad": facilityInput
            })
        }

        const apiPost = await fetch(API_URL + NEW_FACILITY, requestBody);
        Facilidades.push(facilityInput);
        setFacilityInput('');
        inputRef.current.value = '';
        setFacUpadate(false);
    }

    async function postActive() {

    }

    function onFacUpdateHandler() {
        setFacUpadate(true)
    }

    function onActUpdateHandler() {

    }

    function onUpdateHandler() {
        onUpdate(Nombre)
    }

    return <>
        <li>
            <div>
                <h2>Laboratorio {Nombre}</h2>
                <form>
                    <label htmlFor="capacidad">Capacidad: </label>
                    <input
                        id="capacidad"
                        defaultValue={Capacidad}
                        {...register("capacidad")} />
                    <label htmlFor="computadores">Computadores: </label>
                    <input
                        id="computadores"
                        defaultValue={Computadores}
                        {...register("computadores")} />
                    <input type="submit" />
                </form>
                <div className={classes.middleSect}>
                    <div>
                        <h3>Facilidades:</h3>
                        <div> {Facilidades.map((facility) => {
                            return (
                                <p>{facility}</p>
                            )
                        })}</div>
                        {facUpdate && (
                            <input
                                required
                                type="text"
                                name="newFac"
                                id="newFac"
                                placeholder="Nueva Facilidad"
                                ref={inputRef}
                                onChange={(e) => setFacilityInput(e.target.value)} />
                        )}
                        <button onClick={onFacUpdateHandler}>Agregar</button>
                        <button onClick={postFacility}>Listo</button>
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

export default LabOptForm;