import styles from './SpecialAbilities.module.css'

function SpecialAbilities({ monster, setMonster }) {
    const handleActionNameChange = (actionIndex, newName) => {
        setMonster(prevMonster => ({
            ...prevMonster,
            special_abilities: prevMonster.special_abilities?.map((ability, index) => 
                index === actionIndex ? {...ability, name: newName} : ability
            )
        }))
    }

    const handleDescChange = (actionIndex, newDesc) => {
        setMonster(prevMonster => ({
            ...prevMonster,
            special_abilities: prevMonster.special_abilities?.map((ability, index) => 
                index === actionIndex ? {...ability, desc: newDesc} : ability
            )
        }))
    }

    const handleRemoveAction = (actionIndex) => {
        setMonster(prevMonster => ({
            ...prevMonster,
            special_abilities: prevMonster.special_abilities.filter((_, index) => index !== actionIndex)
        }));
    };


    return (
        <>
            {monster.special_abilities.map((ability, abilityIdx) => (
                <div key={abilityIdx}>
                    <div className={styles.formGroup}>
                        <div className={styles.btnContainer}>
                            <label>Ability Name:</label>
                            <input
                                type="text"
                                value={ability.name}
                                onChange={(e) => handleActionNameChange(abilityIdx, e.target.value)}
                            />
                            <button 
                                type="button"
                                onClick={() => handleRemoveAction(abilityIdx)}
                                className={styles.removeButton}
                            >X</button>
                        </div>
                    </div>
                    <br />
                    <div className={styles.indent}>
                        <div className={styles.formGroup}>
                            <label>Description:</label>
                            <textarea
                                rows={3}
                                columns={10}
                                value={ability.desc}
                                onChange={(e) => handleDescChange(abilityIdx, e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SpecialAbilities;