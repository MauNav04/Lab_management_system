import { useForm, Controller } from "react-hook-form"

function ActiveObjForm({ Tipo, Placa, Marca }) {

    const API_URL = 'http://localhost:5095';

    const PUT_ACTIVE_PLAQUE = '/Profesor/ModificarPlaca?placaActual='
    const PUT_ACTIVE_TYPE = '/Profesor/ModificarTipo?placa='
    const PUT_ACTIVE_BRAND = '/Profesor/ModificarMarca?placa='

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm();

    async function updatActiveData(newData) {
        const requestBody = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {
            const putPlaque = await fetch(API_URL + PUT_ACTIVE_PLAQUE + Placa + '&placaNueva=' + newData.placa, requestBody);
            const putType = await fetch(API_URL + PUT_ACTIVE_TYPE + newData.placa + '&tipo=' + newData.tipo, requestBody);
            const putBrand = await fetch(API_URL + PUT_ACTIVE_BRAND + newData.placa + '&marca=' + newData.marca, requestBody);

        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };

    const onSubmit = (data) => {
        console.log('UPDATED ACTIVE DATA', data);
        updatActiveData(data);
        alert('Activo ha sido actualizado')
    };

    return <>
        <div>
            <h2>Activo: {Placa}</h2>
            <form onSubmit={handleSubmit(onSubmit)} >
                <label htmlFor="tipo">Tipo: </label>
                <input
                    id="tipo"
                    defaultValue={Tipo}
                    {...register("tipo")} />
                <label htmlFor="placa">Placa: </label>
                <input
                    id="placa"
                    defaultValue={Placa}
                    {...register("placa")} />
                <label htmlFor="marca">Marca: </label>
                <input
                    id="marca"
                    defaultValue={Marca}
                    {...register("marca")} />

                <input type="submit" />
            </form>

        </div>
    </>
}

export default ActiveObjForm;