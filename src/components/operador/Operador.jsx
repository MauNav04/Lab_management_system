import React from 'react';
import classes from '../AdminHome.module.css'; // Import CSS file for styling
import imageSrc from '../../img/lab.jpg';
import activeSrc from '../../img/activos.jpg';
import profSrc from '../../img/prof.jpg';
import { useNavigate } from 'react-router-dom';
//import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Header = ({ opName }) => {
  return (
    <div className={classes.toptobottom}>
      <h1>Bienvenido, {opName}</h1>
    </div>
  );
};

const enroute = (text) => {
  if (text == 1) {
    console.log('Button clicked!', { text });

  }
}

const Button = ({ text, Click }) => {
  // Define the click handler
  const handleClick = () => {
    // Call enroute function when button is clicked
    enroute(Click);
  };

  return (
    <button className={classes.btn} onClick={handleClick}>{text}</button>
  );
};

class Operador extends React.Component {


  render() {
    return (
      <div className={classes.mainadminpage}>
        <Header opName="Operador" />
        <div className={classes.managementtools}>
          <h1> Reservación de laboratorio</h1>
          <p> Permite realizar la reserva de un laboratorio en un horario disponible a nombre de un estudiante
          </p>
          <div className={classes.imagecontainer}>
            <img src={imageSrc} alt='None' />
          </div>
          <Link to="/operador/prestamopf">
            <Button text="Reservaciones" />
          </Link>
        </div>


        <div className={classes.actmanagement}>
          <h1> Préstamo de activo a profesor</h1>
          <p> Permite prestar un activo a un profesor, requiere validación de las credenciales del profesor
          </p>
          <div className={classes.imagecontainer}>
            <img src={activeSrc} alt='None' />
          </div>
          <Button text="Ingresar" onClick={() => this.handleToolButtonClick('labgestor')} />
        </div>

        <div className={classes.profmanagement}>
          <h1> Préstamo de activo a estudiante</h1>
          <p> Permite que un estudiante solicite un préstamo, el préstamo puede requerir de la aprobación de un profesor
          </p>
          <div className={classes.imagecontainer}>
            <img src={activeSrc} alt='None' />
          </div>
          <Button text="Ingresar" onClick={() => this.handleToolButtonClick('labgestor')} />
        </div>

        <div className={classes.othermanagement}>
          <h1> Otros</h1>
          <p> Otras funcionalidades de Operador
          </p>
          <p></p>
          <Button text="Devolución de activo" onClick={() => this.handleToolButtonClick('labgestor')} />
          <p></p>
          <Button text="Registro de averías" onClick={() => this.handleToolButtonClick('labgestor')} />
          <p></p>
          <Button text="Generador de reportes" onClick={() => this.handleToolButtonClick('labgestor')} />
          <p></p>
          <Button text="Cerrar sesión" onClick={() => this.handleToolButtonClick('labgestor')} />

        </div>


      </div>
    );
  }
}

export default Operador;


