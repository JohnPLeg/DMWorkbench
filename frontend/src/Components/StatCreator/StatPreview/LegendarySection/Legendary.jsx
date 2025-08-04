import styles from './Legendary.module.css'

function Legendary({ monster, setMonster }) {
    const handleActionNameChange = (actionIndex, newName) => {
        setMonster(prevMonster => ({
            ...prevMonster,
            legendary_actions: prevMonster.legendary_actions?.map((legAction, index) => 
                index === actionIndex ? {...legAction, name: newName} : legAction
            )
        }))
    }

    const handleDescChange = (actionIndex, newDesc) => {
        setMonster(prevMonster => ({
            ...prevMonster,
            legendary_actions: prevMonster.legendary_actions?.map((legAction, index) => 
                index === actionIndex ? {...legAction, desc: newDesc} : legAction
            )
        }))
    }
    
    const handleRemoveAction = (actionIndex) => {
        setMonster(prevMonster => ({
            ...prevMonster,
            legendary_actions: prevMonster.legendary_actions.filter((_, index) => index !== actionIndex)
        }));
    };

    return (
        <>
            <br />
            {monster.legendary_actions.map((action, actionIdx) => (
                <div key={actionIdx}>
                    <div className={styles.formGroup}>
                        <div className={styles.btnContainer}>
                            <label>Legendary Action Name:</label>
                            <input
                                type="text"
                                value={action.name}
                                onChange={(e) => handleActionNameChange(actionIdx, e.target.value)}
                            />
                            <button 
                                type="button"
                                onClick={() => handleRemoveAction(actionIdx)}
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
                                value={action.desc}
                                onChange={(e) => handleDescChange(actionIdx, e.target.value)}
                            />
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
            ))}
        </>
    )
}

export default Legendary;