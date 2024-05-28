import { useNavigate } from "react-router-dom";

function Unauthorized() {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>No autorizado</h1> <br />
            No tiene autorización para ingresar a esta página.
            <div>
                <button onClick={goBack}>Volver</button>
            </div>
        </section>
    )
}

export default Unauthorized;