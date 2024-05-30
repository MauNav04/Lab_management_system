import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import classes from './admin.module.css';
import LabOpt from './LabOpt';
import LabOptForm from './LabOptForm';
import ModifyLab from './ModifyLab';
import { Navigate, useNavigate } from "react-router-dom";

function AdminLabHome() {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const API_URL = 'http://localhost:5095';
    const CURRENT_LABS_EP = '/Laboratorio/MostrarNombreLabsDisponibles';
    const INFO_LAB_EP = '/Laboratorio/MostrarInformacionLab?nombreLab=';
    const INFO_FACS_LAB = '/Laboratorio/MostrarFacilidades?nombreLab=';
    const INFO_ACTS_LAB = '/Laboratorio/MostrarActivosLab?nombreLab=';
    const INFO_SCHED_LAB = '/Horario/MostrarHorariosLab?nombreLab=';

    const [labs, setLabs] = useState([]);

    const [updatingLab, setUpdatingLab] = useState('')
    const [updating, setUpdating] = useState(false)

    let [labInfo, setLabInfo] = useState({
        Nombre: '',
        Capacidad: 0,
        Computadores: 0,
        Facilidades: [],
        Activos: [],
        Horario: []
    })

    useEffect(() => {
        console.log(labInfo);
    }, [labInfo]);

    useEffect(() => {
        fetchLabs();
    }, []);

    async function fetchLabs() {
        try {
            const response = await fetch(API_URL + CURRENT_LABS_EP);
            const currentLabs = await response.json();
            await fetchLabInfo(currentLabs)
            console.log('Labs Loaded!')
        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };

    function onUpdateHandler(labName) {
        setUpdatingLab(labName)
        setUpdating(true)
    }


    async function fetchLabInfo(labNames) {
        try {

            let labsDetails = []

            for (let i = 0; i < labNames.length; i++) {
                const labInfoDet = {
                    Nombre: '',
                    Capacidad: 0,
                    Computadores: 0,
                    Facilidades: [],
                    Activos: [],
                    Horario: []
                }

                const labName = labNames[i];

                const cap_pcs_resp = await fetch(API_URL + INFO_LAB_EP + labName);
                const cap_pcs_obj = await cap_pcs_resp.json();

                const facilities_resp = await fetch(API_URL + INFO_FACS_LAB + labName);
                const facilities_obj = await facilities_resp.json();

                const actives_resp = await fetch(API_URL + INFO_ACTS_LAB + labName);
                const actives_obj = await actives_resp.json();

                const schedule_resp = await fetch(API_URL + INFO_SCHED_LAB + labName);
                const schedule_obj = await schedule_resp.json();

                labInfoDet.Nombre = labName;
                labInfoDet.Capacidad = cap_pcs_obj[0].Capacidad;
                labInfoDet.Computadores = cap_pcs_obj[0].Computadores;
                labInfoDet.Facilidades = facilities_obj;
                labInfoDet.Activos = actives_obj;
                labInfoDet.Horario = schedule_obj;

                labsDetails.push(labInfoDet)
            }

            setLabs(labsDetails)

            console.log('Lab info Loaded!', labInfo)
        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };

    return <>
        <div>
            {updating ? (
                <ModifyLab />
            ) : (
                <div className={classes.box}>
                    <h1>Laboratorios</h1>

                    <ul className={classes.labInfo}>
                        {console.log('detr', labs)}
                        {labs.map((detLab) => {
                            return (
                                <LabOptForm
                                    Nombre={detLab.Nombre}
                                    Capacidad={detLab.Capacidad}
                                    Computadores={detLab.Computadores}
                                    Facilidades={detLab.Facilidades}
                                    Activos={detLab.Activos}
                                    Horario={detLab.Horario}
                                    onUpdate={onUpdateHandler}
                                />
                            )
                        })}
                    </ul>


                </div>
            )}
            <button onClick={goBack}>Volver</button>

        </div>
    </>
}

export default AdminLabHome;