import React from 'react';
import classes from './AdminHome.module.css'; // Import CSS file for styling
import imageSrc from '../img/lab.jpg';
import activeSrc from '../img/activos.jpg';
import profSrc from '../img/prof.jpg';


const Header = ({ adminName }) => {
  return (
    <div className={classes.toptobottom}>
      <h1>Aprobación de Operadores</h1>
    </div>
  );
};

const enroute = (text) => {
  if(text == 1){
    console.log('Button clicked!', {text});
  }
  

}

const Button = ({ text, Click }) => {
  return (
    <button className={classes.btn} onClick={() => enroute(1)}>{text}</button>
  );
};

class Opap extends React.Component {
  

  render() {
    return (
      <div className={classes.mainadminpage}>
        <Header adminName="Administrador" />
        <div className={classes.managementtools}>
          <h1> Solicitudes</h1>
          <h2> Existen {4} solicitudes </h2>
          <Button text="Aceptar todas" Click={1} />
          <Button text="Gestionar" Click={1} />
          <Button text="Volver al Menú" Click={1} />
        </div>
        <div className={classes.moreinfo}>
          
        </div>


        
      </div>
    );
  }
}

export default Opap;
