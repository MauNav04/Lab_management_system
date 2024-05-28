import classes from './MainHeader.module.css';

function MainHeader({ onCreatePost }) {

  return (
    <header className={classes.header}>
      <h1 className={classes.title}>
        Laboratorio CE
      </h1>

      <h2 className={classes.subtitle}>
        Sistema de control de laboratorios
      </h2>
    </header>
  );
}

export default MainHeader;