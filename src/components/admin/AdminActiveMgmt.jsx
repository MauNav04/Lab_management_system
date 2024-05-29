import { useEffect, useState, useRef } from "react";
import classes from './admin.module.css';
import ActiveObjForm from "./ActiveOptFrom";


function AdminActiveMgmt() {
    const API_URL = 'http://localhost:5095';
    const GET_ACTIVES_DATA = '/Profesor/InfoActivos'

    const [activesData, setActivesData] = useState([]);

    useEffect(() => {
        fetchActivesData();
    }, []);

    async function fetchActivesData() {
        try {
            const response = await fetch(API_URL + GET_ACTIVES_DATA);
            const activesDets = await response.json();
            setActivesData(activesDets);
        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };

    return <>
        <div>
            <h1>Gestor de Activos</h1>

            <div name="body" className={classes.mainBox}>
                <div name="sideMenu" className={classes.sideBar}>
                    <div>
                        <h2>Tipos de Activos</h2>
                        <ul>
                            <li>Cables</li>
                            <li>FPGA</li>
                            <li>Fuente CA</li>
                            <li>Fuente CD</li>
                            <li>Multimetro</li>
                            <li>Osciloscopio</li>
                        </ul>
                    </div>
                    <button>Volver al menú</button>
                </div>

                <div name="MainContent" className={classes.mainContent}>

                    {activesData.map((activeDets) => {
                        return (
                            <ActiveObjForm
                                key={activeDets.Placa}
                                Tipo={activeDets.Tipo}
                                Placa={activeDets.Placa}
                                Marca={activeDets.Marca}
                            />
                        )
                    })}

                </div>

            </div>
        </div>
    </>
}

export default AdminActiveMgmt;