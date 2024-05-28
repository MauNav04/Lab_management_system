import React, { useState, useEffect } from 'react';

function TimeSelector({ currentDate, labName, hourOptions, onTimeSelect }) {
    const API_URL = 'http://localhost:5095'
    const INFO_LAB_EP = '/Laboratorio/MostrarHorarioOcupado?nombreLab='

    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservedHours()
    }, []);

    function cleanUpReservations(reservationsObject) {
        const finalRervations = []
        console.log('SELECTED DATE: ', currentDate)
        for (let i = 0; i < reservationsObject.length; i++) {
            const reservation = reservationsObject[i];
            if (reservation.Fecha === currentDate) {
                finalRervations.push(reservation.HoraApertura.slice(0, 5))
            }
        }
        if (finalRervations.length === 0) {
            console.log('This date has no current reservations')
            //return
        }
        const filteredReservs = hourOptions.filter(item => !finalRervations.includes(item));
        setReservations(filteredReservs);
    }

    async function fetchReservedHours() {
        try {
            const response = await fetch(API_URL + INFO_LAB_EP + labName);
            const jsonResp = await response.json();
            cleanUpReservations(jsonResp);
            //const cleanReservations = cleanUpReservations(jsonResp);
            //setReservations(cleanUpReservations(jsonResp));
        } catch (error) {
            console.error('Error fetching reservations', error);
        }
    }

    return (
        <div className="time-selector">
            {reservations.map((time, index) => (
                <button
                    key={index}
                    //className={`time-option ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => onTimeSelect(time)}
                >
                    {time}
                </button>
            ))}
        </div>
    );
};


export default TimeSelector;