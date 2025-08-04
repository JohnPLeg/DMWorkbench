import styles from "../StatPreview.module.css"
import { crProf } from "../../../../Data/dropdownInfo";

function SpeedSection({ monster, setMonster }) {
    // updates the monster object with what the user types
    const handleChange = (e) => {
        const { name, value } = e.target;

        setMonster(prevMonster => ({
            ...prevMonster,
            speed: {
                ...prevMonster.speed,
                [name]: value
            }
        }));
    }

    return (
        <>
            <div className={styles.formGroup}>
                <label htmlFor="speed">Speed:</label>
                <input 
                    type="text"
                    name='walk'
                    id='speed'
                    value={monster.speed?.walk || ''}
                    onChange={handleChange}
                    placeholder="0 ft"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="burrowSpeed">Burrow Speed:</label>
                <input 
                    type="text"
                    name='burrow'
                    id='burrow'
                    value={monster.speed?.burrow || ''}
                    onChange={handleChange}
                    placeholder="0 ft."
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="climbSpeed">Climb Speed:</label>
                <input 
                    type="text"
                    name='climb'
                    id='climbSpeed'
                    value={monster.speed?.climb || ''}
                    onChange={handleChange}
                    placeholder="0 ft."
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="flySpeed">Flying Speed:</label>
                <input 
                    type="text"
                    name='fly'
                    id='flySpeed'
                    value={monster.speed?.fly || ''}
                    onChange={handleChange}
                    placeholder="0 ft."
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="swimSpeed">Swim Speed:</label>
                <input 
                    type="text"
                    name='swim'
                    id='swimSpeed'
                    value={monster.speed?.swim || ''}
                    onChange={handleChange}
                    placeholder="0 ft."
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="name">Challenge Rating (+{crProf[monster?.challenge_rating]}):</label>
                <input 
                    type="text"
                    name='name'
                    id='name'
                    value={monster?.challenge_rating || ''}
                    onChange={handleChange}
                    placeholder="Name"
                />
            </div>
        </>
    )
}

export default SpeedSection;