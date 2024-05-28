import React from 'react';
import classes from '../AdminHome.module.css'; // Import CSS file for styling



const Header = ({ adminName }) => {
  return (
    <div className={classes.toptobottom}>
      <h1>Devolución de activo</h1>
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

class Devolucionact extends React.Component {
  

  render() {
    return (
      <div className={classes.mainadminpage}>
        <Header adminName="Administrador" />
        <div className={classes.managementtools}>
          <h1> Devolución</h1>
          <h2> Al registrar la devolución se confirma que el activo se ha devuelto en óptimas condiciones</h2>
          <Button text="Volver al Menú" Click={1} />
        </div>
        <div className={classes.moreinfo}>
          
        </div>


        
      </div>
    );
  }
}

export default Devolucionact;
