import React from 'react';
import classes from '../AdminHome.module.css'; // Import CSS file for styling



const Header = ({ adminName }) => {
  return (
    <div className={classes.toptobottom}>
      <h1>Préstamo a estudiante</h1>
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

class Prestamoest extends React.Component {
  

  render() {
    return (
      <div className={classes.mainadminpage}>
        <Header adminName="Administrador" />
        <div className={classes.managementtools}>
          <h1> Estudiante</h1>
          <h2> Existen {4} solicitudes </h2>
          <Button text="Volver al Menú" Click={1} />
        </div>
        <div className={classes.moreinfo}>
          
        </div>


        
      </div>
    );
  }
}

export default Prestamoest;
