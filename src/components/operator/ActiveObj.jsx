

function ActiveObj({ Tipo, Placa, Marca, Texto, onDelete, id }) {
    function onDeleteHandler() {
        if (Texto === 'Seleccionar') {
            onDelete(Placa)
        } else {
            onDelete(id, Placa)
        }
    }


    return <>
        <li>
            <div>
                <p>Tipo: {Tipo}</p>
                <p>Placa: {Placa}</p>
                <p>Marca: {Marca}</p>
            </div>
            <button onClick={onDeleteHandler}>{Texto}</button>
        </li>
    </>
}

export default ActiveObj;