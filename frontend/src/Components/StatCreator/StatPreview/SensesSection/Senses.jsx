import styles from "../StatPreview.module.css";

function Senses({ monster, setMonster }) {
    // updates the monster object with what the user types
    const handleChange = (e) => {
        const { name, value } = e.target;

        setMonster(prevMonster => ({
            ...prevMonster,
            senses: {
                ...prevMonster.senses,
                [name]: value
            }
        }));
    };

    
    return (
        <>
            <div className={styles.formGroup}>
                <label htmlFor="Blindsight">Blindsight:</label>
                <input 
                    type="text"
                    name='blindsight'
                    id='blindsight'
                    value={monster.senses?.blindsight || ''}
                    onChange={handleChange}
                    placeholder="0 ft"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="Darkvision">Darkvision:</label>
                <input 
                    type="text"
                    name='darkvision'
                    id='darkvision'
                    value={monster.senses?.darkvision || ''}
                    onChange={handleChange}
                    placeholder="0 ft"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="Tremorsense">Tremorsense:</label>
                <input 
                    type="text"
                    name='tremorsense'
                    id='tremorsense'
                    value={monster.senses?.tremorsense || ''}
                    onChange={handleChange}
                    placeholder="0 ft"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="Truesight">Truesight:</label>
                <input 
                    type="text"
                    name='truesight'
                    id='truesight'
                    value={monster.senses?.truesight || ''}
                    onChange={handleChange}
                    placeholder="0 ft"
                />
            </div>
        </>
    )
}

export default Senses;