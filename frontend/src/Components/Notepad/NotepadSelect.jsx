import Navigation from '../Navigation/Navigation'
import styles from './NotepadSelect.module.css'

function NotepadSelect() {
    return (
        <>
            <Navigation/>
            <div className={styles.noteContainer}>
                <div className={styles.noteCard}>
                    <img src="personIcon.png" alt="a person icon" className={styles.dmImg}/>
                    <h1>Player</h1>
                </div>
                <div className={styles.noteCard}>
                    <img src="wizardHat.png" alt="a wizard hat" className={styles.dmImg}/>
                    <h1>DM</h1>
                </div>
            </div>
        </>
    )
}

export default NotepadSelect;