import { useEffect, useState } from "react";
import ProfOpt from "./ProfOpt";
import classes from './admin.module.css';
import { useNavigate } from "react-router-dom";

function AdminProfMgmt() {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const API_URL = 'http://localhost:5095';
    const PROFESSOR_DATA = '/Profesor/CredencialesProfesores'

    const [visibleSect, setVisibleSect] = useState(null);
    const [teachers, setTeachers] = useState([])

    const handleShowModify = () => {
        setVisibleSect('modify');
        fetchTeacherData();
    };

    const handleShowAdd = () => {
        setVisibleSect('add');
    };

    useEffect(() => {
        handleShowModify();
    }, []);

    useEffect(() => {
        fetchTeacherData();
    }, [visibleSect]);

    async function fetchTeacherData() {
        try {
            const response = await fetch(API_URL + PROFESSOR_DATA);
            const currentTeachers = await response.json();
            setTeachers(currentTeachers)
        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };

    return <>
        <div>
            <h1>Gestor de Profesores</h1>

            <div name="body" className={classes.mainBox}>
                <div name="sideMenu" className={classes.sideBar}>
                    <h2>Opciones</h2>
                    <button onClick={handleShowModify}>Modificar</button>
                    <button onClick={handleShowAdd}>Añadir Profesor</button>
                    <button onClick={goBack}>Volver al menú</button>
                </div>

                {visibleSect === 'modify' && (
                    <div name="ModifyTheacher" className={classes.mainContent}>

                        {teachers.map((teacherDets) => {
                            return (
                                <ProfOpt
                                    key={teacherDets.Cedula}
                                    Cedula={teacherDets.Cedula}
                                    Nombre={teacherDets.Nombre}
                                    Correo={teacherDets.Correo}
                                    Apellido1={teacherDets.Apellido1}
                                    Apellido2={teacherDets.Apellido2}
                                    FechaNacimiento={teacherDets.FechaNacimiento}
                                    NewFlag={false}
                                />
                            )
                        })}

                    </div>
                )}

                {visibleSect === 'add' && (
                    <div name="AddTheacher">
                        <ProfOpt
                            NewFlag={true}
                        />
                    </div>
                )}
            </div>
        </div>

    </>
}

export default AdminProfMgmt;