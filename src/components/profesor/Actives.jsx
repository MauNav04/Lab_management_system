import { icon } from '@fortawesome/fontawesome-svg-core';
import styles from './Actives.module.css'
import { MdCancel } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";

function Actives({ id, nombre, apellido, tipo, onDelete }) {
    function onDeleteHandler() {
        onDelete(id)
    }

    return (
        <li className={styles.post}>
            <p className={styles.author}>{nombre} {apellido}</p>
            <p className={styles.type}>{tipo}</p>

            <button onClick={onDeleteHandler}>
                <MdCheckCircle size={32} color='green' />
            </button>
        </li>
    )
}

export default Actives;