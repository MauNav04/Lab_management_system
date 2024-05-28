import classes from './ProfessorHeader.module.css'

function ProfessorHeader() {

    return <>
        <header className={classes.header}>
            <h1 className={classes.title}>
                Bienvenido al Sistema Docente
            </h1>
        </header>
    </>

}

export default ProfessorHeader;