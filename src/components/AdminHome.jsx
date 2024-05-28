import React from 'react';
import classes from './AdminHome.module.css'; // Import CSS file for styling
import imageSrc from '../img/lab.jpg';
import activeSrc from '../img/activos.jpg';
import profSrc from '../img/prof.jpg';
import { useLocation, Navigate, Outlet, Link } from "react-router-dom";


const Header = ({ adminName }) => {
  return (
    <div className={classes.toptobottom}>
      <h1>Bienvenido, {adminName}</h1>
    </div>
  );
};

const enroute = (text) => {
  if (text == 1) {
    <Navigate to="/admin/labmg" />
    console.log(1)
  }


}

const Button = ({ text, Click }) => {
  return (
    <button className={classes.btn} onClick={() => enroute(1)}>{text}</button>
  );
};

class MainAdminPage extends React.Component {


  render() {
    return (
      <div className={classes.mainadminpage}>
        <Header adminName="Administrador" />
        <div className={classes.managementtools}>
          <h1> Gestor de Laboratorios</h1>
          <p> Permite gestionar toda la información de los laboratorios:
          </p>
          <p> -Nombre <br></br>
            -Capacidad de personas <br></br> -Computadores
            <br></br> -Facilidades
            <br></br> -Horarios
            <br></br> -Activos
          </p>
          <div className={classes.imagecontainer}>
            <img src={imageSrc} alt='None' />
          </div>
          <Link to="/admin/labmg">
          <Button text="Ir a Laboratorios"/>
          </Link>
        </div>


        <div className={classes.actmanagement}>
          <h1> Gestor de Activos</h1>
          <p> Permite gestionar toda la información de los activos:
          </p>
          <p> -Placa <br></br>
            -Tipo <br></br> -Marca
            <br></br> -Fecha de compra
            <br></br> -Préstamos
          </p>
          <div className={classes.imagecontainer}>
            <img src={activeSrc} alt='None' />
          </div>
          <Link to="/admin/actmg">
          <Button text="Ir a Activos" />
          </Link>
        </div>

        <div className={classes.profmanagement}>
          <h1> Gestor de Profesores</h1>
          <p> Permite dar de alta, modificar o eliminar profesores:
          </p>
          <p><br></br>
            <br></br>
            <br></br>
          </p>
          <div className={classes.imagecontainer}>
            <img src={profSrc} alt='None' />
          </div>
          <Link to="/admin/profmg">
          <Button text="Ir a Profesores"/>
          </Link>
        </div>

        <div className={classes.othermanagement}>
          <h1> Otros</h1>
          <p> Otras funcionalidades de Administrador
          </p>
          <p></p>
        <Link to="/admin/opap"> 
        <Button text="Aprobación de operadores"/>
        </Link>
        <p></p>
        <Link to="/admin/password"> 
        <Button text="Reestablecer contrseñas"/>
        </Link>
        <p></p>
        <Link to="/admin/reports"> 
        <Button text="Generador de reportes" onClick={() => this.handleToolButtonClick('labgestor')} />
        
        <p></p>
        </Link>
        <Link to="/"> 
        <Button text="Cerrar sesión" />
        </Link>
        </div>


      </div>
    );
  }
}

export default MainAdminPage;


