import React, { useState } from 'react';
import classes from './AdminHome.module.css'; // Import CSS file for styling
import imageSrc from '../img/lab.jpg';
import activeSrc from '../img/activos.jpg';
import profSrc from '../img/prof.jpg';
import { Link } from 'react-router-dom';


const Header = ({ adminName }) => {
  return (
    <div className={classes.toptobottom}>
      <h1>Gestor de Laboratorios de {adminName}</h1>
    </div>
  );
};

const enroute = (text) => {
  if (text == 1) {
    console.log('Button clicked!', { text });
  }
  if (text == 2) {
    { toggleVisibility }
    console.log(isVisible)
  }
}

const Button = ({ text, Click }) => {
  return (
    <button className={classes.btn} onClick={() => enroute(Click)}>{text}</button>
  );
};

const Labmg = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsVisible2(true);
  };
  const toggleVisibility2 = () => {
    setIsVisible2(!isVisible2);
    setIsVisible(true);
  }
  return (
    <div className={classes.mainadminpage}>
      <Header adminName="Administrador" />

      {isVisible2 ? (
        <div className={classes.managementtools}>
          <h1> Laboratorio de mediciones</h1>
          <h2> Capacidad {"10"} personas</h2>
          <h2> Posee {10} computadores</h2>
          <h2> Posee {2} facilidades</h2>
          <h2> Posee {5} activos</h2>
          {!isVisible ? (
            <button className={classes.btn} onClick> Cambiar capacidad</button>
          ) : null}
          <button className={classes.btn} onClick={toggleVisibility}> {isVisible ? "Ampliar información" : "Volver"}</button>
        </div>
      ) : null}

      {isVisible && isVisible2 ? (
        <div className={classes.actmanagement}>
          <h1> Laboratorio de computadores 1</h1>
          <h2> Capacidad {"10"} personas</h2>
          <h2> Posee {10} computadores</h2>
          <h2> Posee {2} facilidades</h2>
          <h2> Posee {5} activos</h2>
          <button className={classes.btn} onClick={toggleVisibility2}> Ampliar información</button>
        </div>
      ) : null}
      {isVisible && isVisible2 ? (
        <div className={classes.profmanagement}>
          <h1> LuTEC</h1>
          <h2> Capacidad {"10"} personas</h2>
          <h2> Posee {10} computadores</h2>
          <h2> Posee {2} facilidades</h2>
          <h2> Posee {5} activos</h2>
          <button className={classes.btn} onClick={toggleVisibility2}> Ampliar información</button>
        </div>
      ) : null}
      {!isVisible || !isVisible2 ? (
        <div>
          <div className={classes.moreinfo}>
            <div className={classes.line}>
              <h2> Computadores </h2>
            </div>
            <div className={classes.line}>
              <h2> Facilidades </h2>
            </div>
            <div className={classes.line}>
              <h2> Activos </h2>
            </div>
            <div className={classes.line}>
              <h2> Horarios </h2>
            </div>
          </div>
          <div className={classes.line2}>
            <button className={classes.btn}> Modificar</button>
            <button className={classes.btn}> Ver facilidades</button>
            <button className={classes.btn}> Ver Activos</button>
            <button className={classes.btn}> Ver horarios</button>
          </div>
        </div>
      ) : null}
      {isVisible && isVisible2 ? (
        <div className={classes.othermanagement}>
          <h1> Otros</h1>
          <Link to='/admin'>
            <Button text="Página principal" />
          </Link>
          <Link to='/admin/actmg'>
            <Button text="Gestor de Activos" />
          </Link>
          <Link to='/admin/profmg'>
            <Button text="Gestor de profesores" Click={1} />
          </Link>
          <Link to='/'>
            <Button text="Cerrar sesión" Click={1} />
          </Link>
        </div>
      ) : null}

      {!isVisible2 ? (
        <div className={classes.managementtools}>
          <h1> Laboratorio de computadores 1</h1>
          <h2> Capacidad {"10"} personas</h2>
          <h2> Posee {10} computadores</h2>
          <h2> Posee {2} facilidades</h2>
          <h2> Posee {5} activos</h2>
          {!isVisible2 ? (
            <button className={classes.btn} onClick> Cambiar capacidad</button>
          ) : null}
          <button className={classes.btn} onClick={toggleVisibility2}> Volver</button>
        </div>
      ) : null}


    </div>
  );
}

export default Labmg;
