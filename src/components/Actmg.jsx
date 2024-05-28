import React from 'react';
import classes from './AdminHome.module.css'; // Import CSS file for styling
import imageSrc from '../img/lab.jpg';
import activeSrc from '../img/activos.jpg';
import profSrc from '../img/prof.jpg';


const Header = ({ adminName }) => {
  return (
    <div className={classes.toptobottom}>
      <h1>Gestor de Activos de {adminName}</h1>
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

class Actmg extends React.Component {
  

  render() {
    return (
      <div className={classes.mainadminpage}>
        <Header adminName="Administrador" />
        <div className={classes.managementtools}>
          <h1> Activos</h1>
          <h2> Capacidad {"10"} personas</h2>
          <Button text="Modificar" Click={1} />
          <Button text="Volver al Menú" Click={1} />
        </div>
        <div className={classes.moreinfo}>
          
        </div>


        
      </div>
    );
  }
}

export default Actmg;
