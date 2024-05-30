import { useForm, Controller } from "react-hook-form"
import { useEffect, useState, useRef } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO, format } from 'date-fns';
import CryptoJS from 'crypto-js';
import classes from './admin.module.css'


function ProfOpt({ Cedula, Nombre, Correo, Apellido1, Apellido2, FechaNacimiento, onClickHandler, NewFlag }) {
    const API_URL = 'http://localhost:5095';

    const PUT_PROF_NAME = '/Profesor/ModificarNombre?correo='
    const PUT_PROF_ID = '/Profesor/ModificarCedula?correo='
    const PUT_FIRST_LASTN = '/Profesor/ModificarPrimerApellido?correo='
    const PUT_SECOND_LASTN = '/Profesor/ModificarSegundoApellido?correo='
    const PUT_BIRTHD = '/Profesor/ModificarFechaNacimiento?correo='

    const POST_NEW_TEACHER = '/Profesor/AgregarProfesor'

    const convertToDate = (dateString) => {
        if (!NewFlag) {
            const [year, month, day] = dateString.split('-');
            return new Date(year, month - 1, day);
        }
    };

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nacimiento: convertToDate(FechaNacimiento)
        }
    });

    async function updateProfName(newData) {
        const requestBody = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {
            const putName = await fetch(API_URL + PUT_PROF_NAME + newData.correo + '&nuevoNombre=' + newData.nombre, requestBody);
            const putID = await fetch(API_URL + PUT_PROF_ID + newData.correo + '&cedula=' + newData.cedula, requestBody);
            const putFLN = await fetch(API_URL + PUT_FIRST_LASTN + newData.correo + '&primerApellido=' + newData.apellido1, requestBody);
            const putSLN = await fetch(API_URL + PUT_SECOND_LASTN + newData.correo + '&segundoApellido=' + newData.apellido2, requestBody);
            const putBirthD = await fetch(API_URL + PUT_BIRTHD + newData.correo + '&fecha=' + newData.nacimiento, requestBody);

        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };

    async function newTeacher(newData) {
        const requestBody = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "correo": newData.correo,
                "cedula": newData.cedula,
                "password": newData.passwordInput,
                "nombre": newData.nombre,
                "apellido1": newData.apellido1,
                "apellido2": newData.apellido2,
                "fechaNacimiento": newData.nacimiento,
                "correoAdministrador": 'betico@gmail.com'
            })
        }
        try {
            const putName = await fetch(API_URL + POST_NEW_TEACHER, requestBody);

        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };

    async function newTeacher(newData) {
        const requestBody = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "correo": newData.correo,
                "cedula": newData.cedula,
                "password": newData.passwordInput,
                "nombre": newData.nombre,
                "apellido1": newData.apellido1,
                "apellido2": newData.apellido2,
                "fechaNacimiento": newData.nacimiento,
                "correoAdministrador": 'betico@gmail.com'
            })
        }
        try {
            const putName = await fetch(API_URL + POST_NEW_TEACHER, requestBody);

        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };

    const onSubmit = (data) => {
        if (NewFlag) {
            const encryptedPassword = CryptoJS.MD5(data.passwordInput).toString();
            const formattedData = {
                ...data,
                nacimiento: format(data.nacimiento, 'yyyy-MM-dd'),
                passwordInput: encryptedPassword
            };

            console.log('NEW TEACHER', formattedData);
            newTeacher(formattedData)
            alert('Profesor Añadido')
        }
        else {
            const formattedData = {
                ...data,
                nacimiento: format(data.nacimiento, 'yyyy-MM-dd')
            };
            console.log('UPDATED TEACHER', formattedData);
            updateProfName(formattedData);
            alert('Datos del profesor actualizados')
        }
    };

    return <>
        <div>
            <h2>Profesor {Correo}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="cedula">Numero de cédula: </label>
                <input
                    id="cedula"
                    defaultValue={Cedula}
                    {...register("cedula")} />
                <label htmlFor="nombre">Nombre: </label>
                <input
                    id="nombre"
                    defaultValue={Nombre}
                    {...register("nombre")} />
                <label htmlFor="apellido1">Primer Apellido: </label>
                <input
                    id="apellido1"
                    defaultValue={Apellido1}
                    {...register("apellido1")} />
                <label htmlFor="apellido2">Segundo Apellido: </label>
                <input
                    id="apellido2"
                    defaultValue={Apellido2}
                    {...register("apellido2")} />
                <label htmlFor="nacimiento">Fecha de nacimiento: </label>
                <div className={classes.datePickContainer}>

                    <Controller
                        name="nacimiento"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                placeholderText="Select date"
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                                className={classes.datePick}
                                popperClassName={classes.customCalendar}
                            />
                        )}
                    />
                </div>
                <label htmlFor="correo">Correo electrónico: </label>
                <input
                    id="correo"
                    defaultValue={Correo}
                    {...register("correo")} />

                {NewFlag && (
                    <>
                        <label htmlFor="passwordInput">Contraseña: </label>
                        <input
                            id="passwordInput"
                            {...register("passwordInput")} />
                    </>

                )}

                <input type="submit" />
            </form>
        </div>
    </>

}

export default ProfOpt;