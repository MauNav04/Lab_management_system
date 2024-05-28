import ProfessorHeader from "../components/profesor/ProfessorHeader";
import ProfessorPanel from "../components/profesor/ProfessorPanel";
import ProfessorBody from "../components/profesor/ProfessorBody";
import classes from './ProfessorPage.module.css'

function ProfessroPage() {

    return <>
        <section className={classes.app}>
            <ProfessorHeader />
            <div className={classes.main}>
                <div className={classes.leftPanel}>
                    <ProfessorPanel />
                </div>
            </div>
        </section>
    </>

}

export default ProfessroPage;