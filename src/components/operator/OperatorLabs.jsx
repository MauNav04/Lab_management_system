import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import LabOption from "../profesor/LabOption";
import CalendarComponent from "../profesor/CalendarComponent";
import TimeSelector from "../profesor/TimeSelector";
import { Navigate, useNavigate } from "react-router-dom";
import classes from './Operator.module.css'

function Labs() {
    const API_URL = 'http://localhost:5095'
    const INFO_LAB_EP = '/Laboratorio/MostrarInformacionLab?nombreLab='
    const CURRENT_LABS_EP = '/Laboratorio/MostrarNombreLabsDisponibles'
    const LAB_SCHEDULE_EP = '/Horario/MostrarHorariosLab?nombreLab='
    const LAB_RESERVATION_STUD = '/PrestamoLab/ReservarLabEstudiante'

    const usuarioProfesor = 'jleiton@itcr.com'

    const [data, setData] = useState([]);
    const [selectedLab, setSelectedLab] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [weekSchedule, setWeekSchedule] = useState([]);
    const [hourScheduleArray, sethourScheduleArray] = useState([]);

    const [carnetEstudiante, setCarnetEstudiante] = useState('');
    const [correoEstudiante, setCorreoEstudiante] = useState('');
    const [nombreEstudainte, setNombreEstudiante] = useState('');
    const [apellidoEstudiante, setApellidoEstudiante] = useState('');

    const [showCalendar, setShowCalendar] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        async function fetchDataAndLabs() {
            fetchLabs();
        }
        fetchDataAndLabs();
    }, []);

    useEffect(() => {
        setShowCalendar(selectedLab !== "");
    }, [selectedLab]);

    function handleSelectedLab(labName) {
        console.log("LAB_NAME", labName)
        setSelectedLab(labName)
        fetchLabSchedule(labName)
    }

    const handleDateSelect = (date) => {
        const dayAbbreviation = date.toString().split(' ')[0];
        let selectedDay = translateDayAbbreviation(dayAbbreviation)
        getDaySchedule(selectedDay);

        setSelectedDate(formatDate(date));
        console.log()
        setShowTime(true);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(formatTime(time));
    };

    useEffect(() => {
        if (showTime) {
            LabReservation()
        }
        setSelectedLab('')
        setShowCalendar(false)
        setShowTime(false)
        console.log('Time UPDATED', selectedTime)
        console.log('Date', selectedDate)
    }, [selectedTime]);

    function getDaySchedule(dayToSchedule) {
        console.log(weekSchedule);
        for (let i = 0; i < weekSchedule.length; i++) {
            const day = weekSchedule[i];
            //console.log('Day: ', daysSchedule)
            if (day.Dia === dayToSchedule) {
                sethourScheduleArray(generateHourArray(day.HoraApertura, day.HoraCierre))
                console.log(hourScheduleArray);
            }
        }
    }

    function generateHourArray(initialHour, closingHour) {
        const hoursArray = [];
        const [initialHourValue, initialMinuteValue] = initialHour.split(':');
        const initialDate = new Date(`2000-01-01T${initialHourValue}:${initialMinuteValue}`);
        const closingDate = new Date(`2000-01-01T${closingHour}`);

        // Add initial hour to the array
        hoursArray.push(`${initialHourValue}:${initialMinuteValue}`);

        // Generate hours between initial and closing hour
        let currentHour = new Date(initialDate);
        while (currentHour < closingDate) {
            currentHour.setHours(currentHour.getHours() + 1);
            const hourString = currentHour.toTimeString().slice(0, 5);
            console.log(hourString)
            hoursArray.push(hourString);
        }

        return hoursArray;
    }

    function translateDayAbbreviation(dayAbbreviation) {
        const dayMappings = {
            "Mon": "L", // Lunes
            "Tue": "K", // Martes
            "Wed": "M", // Miércoles
            "Thu": "J", // Jueves
            "Fri": "V", // Viernes
            "Sat": "S", // Sábado
            "Sun": "D"  // Domingo
        };

        // Extract the day abbreviation from the given string
        const regex = /([A-Za-z]{3})/;
        const matches = dayAbbreviation.match(regex);
        if (matches && matches.length > 1) {
            const day = matches[1];
            // Retrieve the corresponding Spanish first letter from the mapping
            return dayMappings[day] || "";
        }
        return "";
    }

    function formatDate(inputDate) {
        const dateObj = new Date(inputDate);
        const year = dateObj.getFullYear();
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Adding 1 to get the month as 1-indexed

        return `${year}-${month}-${day}`;
    }

    function formatTime(originalTime) {
        const [hours, minutes] = originalTime.split(':');
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:00`;
    }

    async function LabReservation() {
        try {
            const body = {
                carneEstudiante: carnetEstudiante,
                correoEstudiante: correoEstudiante,
                nombreEstudiante: nombreEstudainte,
                apellido1Estudiante: apellidoEstudiante.split(' ')[0],
                apellido2Estudiante: apellidoEstudiante.split(' ')[1],
                fecha: selectedDate,
                horaInicio: selectedTime,
                horaFinal: "00:00:00",
                nombreLab: selectedLab
            }
            const requestBody = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            console.log('BODY: ', body)

            const response = await fetch(API_URL + LAB_RESERVATION_STUD, requestBody);
            const jsonResp = await response.text();
            console.log('New Reservation!!!', jsonResp)
        } catch (error) {
            console.error('Error reservating lab:', error);
        }
    };

    async function fetchLabSchedule(labName) {
        try {
            const response = await fetch(API_URL + LAB_SCHEDULE_EP + labName);
            const jsonResp = await response.json();
            setWeekSchedule(jsonResp);
        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };

    async function fetchLabs() {
        try {
            const response = await fetch(API_URL + CURRENT_LABS_EP);
            const currentLabs = await response.json();
            await fetchData(currentLabs)
            console.log('Labs Loaded!')
        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };

    async function fetchData(availableLabs) {
        try {
            console.log('Bringing labs info')
            console.log('Based on LABS: ', availableLabs)
            let values = []
            for (let i = 0; i < availableLabs.length; i++) {
                const lab = availableLabs[i];
                console.log('Fetching Data...')
                const response = await fetch(API_URL + INFO_LAB_EP + lab);
                let jsonData = await response.json();
                jsonData[0].nombre = availableLabs[i]
                values.push(jsonData[0])
            }
            setData(values)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h2>Labs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Capacidad</th>
                        <th>Computadores</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        if (selectedLab == item.nombre || selectedLab == "") {

                            return (
                                <LabOption
                                    key={index}
                                    nombre={item.nombre}
                                    capacidad={item.Capacidad}
                                    computadores={item.Computadores}
                                    selected={selectedLab}
                                    onSetLabName={handleSelectedLab}
                                />
                            )
                        }
                        else {
                            return (null)
                        }
                    }
                    )}
                </tbody>
            </table>

            <div style={{
                opacity: showCalendar ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
            }}>
                {showCalendar && (
                    <div className={classes.reservationOpts}>
                        <h2>Opciones del Estudiante</h2>
                        <input
                            required
                            type="text"
                            placeholder="Número de Carnet"
                            onChange={(e) => setCarnetEstudiante(e.target.value)}
                        />
                        <input
                            required
                            type="text"
                            placeholder="Correo Estudiante"
                            onChange={(e) => setCorreoEstudiante(e.target.value)}
                        />
                        <input
                            required
                            type="text"
                            placeholder="Nombre del Estudiante"
                            onChange={(e) => setNombreEstudiante(e.target.value)}
                        />
                        <input
                            required
                            type="text"
                            placeholder="Apellidos del Estudiante"
                            onChange={(e) => setApellidoEstudiante(e.target.value)}
                        />
                        <h2>Seleccionar fecha</h2>
                        <CalendarComponent onSelectDate={handleDateSelect} />
                    </div>
                )}
            </div>

            <div style={{
                opacity: showTime ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
            }}>
                {showTime && (
                    <div>
                        <h2>Seleccionar Hora</h2>
                        <TimeSelector currentDate={selectedDate} labName={selectedLab} hourOptions={hourScheduleArray} onTimeSelect={handleTimeSelect} />
                    </div>
                )}
            </div>

            <button onClick={goBack}>Volver</button>
        </div>
    )
}

export default Labs;