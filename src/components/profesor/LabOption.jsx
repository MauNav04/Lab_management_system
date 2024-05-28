import { icon } from '@fortawesome/fontawesome-svg-core';
import styles from './Actives.module.css'
import { MdCancel } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import classes from './LabOption.module.css'

function LabOption({ nombre, capacidad, computadores, selected, onSetLabName }) {
    function onDeleteHandler() {
        onDelete(id)
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td>{capacidad}</td>
            <td>{computadores}</td>
            <td><button onClick={() => { onSetLabName(nombre) }}>Reservar</button></td>
        </tr>
    )
}

export default LabOption;