import React from 'react';
import classes from '../AdminHome.module.css'; // Import CSS file for styling



const Header = ({ adminName }) => {
  return (
    <div className={classes.toptobottom}>
      <h1>Generador de reportes</h1>
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

class Reportsop extends React.Component {
  

  render() {
    return (
      <div className={classes.mainadminpage}>
        <Header adminName="Administrador" />
        <div className={classes.bigone}>
          
        </div>


        
      </div>
    );
  }
}

export default Reportsop;