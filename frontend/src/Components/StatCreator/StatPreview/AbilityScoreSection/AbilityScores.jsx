import styles from "../StatPreview.module.css"
import { abilities } from "../../../../Data/abilities";

function AbilityScores({ monster, setMonster}) {
    // updates the monster object with what the user types
    const handleChange = (e) => {
        const { name, value } = e.target;

        setMonster(prevMonster => ({
            ...prevMonster,
            [name]: value
        }));
    }

    return (
        <>
            {abilities.map(ability => (
                <div key={ability} className={styles.formGroup}>
                    <label htmlFor={ability}>
                        {ability.charAt(0).toUpperCase() + ability.slice(1) + ' '}
                        ({Math.floor((monster[ability] - 10) / 2) >= 0 ? (
                            `+${Math.floor((monster[ability] - 10) / 2)}`
                            ) : (
                                Math.floor((monster[ability] - 10) / 2)
                            )})  
                        :
                    </label>
                    <input 
                        type="text"
                        name={ability}
                        id={ability}
                        value={monster[ability] || ''}
                        onChange={handleChange}
                        placeholder="0"
                    />
                </div>
            ))}
        </>
    )
}

export default AbilityScores;