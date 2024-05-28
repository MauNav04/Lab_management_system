import React, {useState} from 'react';
import classes from '../AdminHome.module.css'; // Import CSS file for styling



const Header = ({ adminName }) => {
  return (
    <div className={classes.toptobottom}>
      <h1>Reservar un laboratorio</h1>
    </div>
  );
};

const enroute = (text) => {
  if(text == 1){
    console.log('Button clicked!', {text});
  }
  if (text == 2){
    {toggleVisibility}
    console.log(isVisible)
  }
  

}

const Button = ({ text, Click }) => {
  return (
    <button className={classes.btn} onClick={() => enroute(Click)}>{text}</button>
  );
};

const Labrsv = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsVisible2(true);
  };
  const toggleVisibility2 = () =>{
    setIsVisible2(!isVisible2);
    setIsVisible(true);
  }
    return (
      <div className={classes.mainadminpage}>
        <Header adminName="Administrador" />

        {isVisible2? (
        <div className={classes.managementtools}>
          <h1> Laboratorio de mediciones</h1>
          <h2> Capacidad {"10"} personas</h2>
          <h2> Posee {10} computadores</h2>
          <h2> Posee {2} facilidades</h2>
          <h2> Posee {5} activos</h2>
          {!isVisible? (
          <button className={classes.btn} onClick> Siguiente semana</button>
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
      {isVisible && isVisible2 ?(
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
      </div>
      </div>
      ) : null}
      {isVisible && isVisible2 ?(
        <div className={classes.othermanagement}>
          <h1> Otros</h1>
          <Button text="Página principal" Click={1} />
          <Button text="Préstamo a profesor" Click={1} />
          <Button text="Préstamo a estudiante" Click={1} />
          <Button text="Cerrar sesión" Click={1} />
        </div>
        ) : null}
      
      {!isVisible2? (
        <div className={classes.managementtools}>
          <h1> Laboratorio de computadores 1</h1>
          <h2> Capacidad {"10"} personas</h2>
          <h2> Posee {10} computadores</h2>
          <h2> Posee {2} facilidades</h2>
          <h2> Posee {5} activos</h2>
          {!isVisible2? (
          <button className={classes.btn} onClick> Siguiente semana</button>
             ) : null}
          <button className={classes.btn} onClick={toggleVisibility2}> Volver</button>
        </div>
        ) : null}

        
      </div>
    );
}

export default Labrsv;
