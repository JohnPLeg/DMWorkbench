import Navigation from '../Navigation/Navigation'
import styles from './NotepadSelect.module.css'
import { useNavigate } from 'react-router-dom';

function NotepadSelect() {
    const navigate = useNavigate();
    return (
        <>
            <Navigation/>
            <div className={styles.noteContainer}>
                <div className={styles.noteCard}>
                    <img src="personIcon.png" alt="a person icon" className={styles.dmImg} onClick={() => navigate('/notepad-player')}/>
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