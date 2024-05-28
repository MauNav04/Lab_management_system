import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarComponent = ({ onSelectDate }) => {
    const [startDate, setStartDate] = useState(null);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 21); // Set max date to 3 weeks from now

    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => {
                setStartDate(date);
                onSelectDate(date);
            }}
            minDate={new Date()} // Allow selection from today onwards
            maxDate={maxDate}
            dateFormat="dd/MM/yyyy"
        />
    );
};

export default CalendarComponent;
