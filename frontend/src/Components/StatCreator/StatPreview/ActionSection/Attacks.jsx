import styles from './Attacks.module.css';

import React from 'react';

function Attacks({ monster, setMonster }) {

    const actionList = monster.actions;

    const handleActionNameChange = (actionToUpdate, newName) => {
        setMonster(prevMonster => ({
            ...prevMonster,
            actions: prevMonster.actions.map(action => action === actionToUpdate ? {...action, name: newName} : action)
        }))
    }

    const handleDescChange = (actionToUpdate, newDesc) => {
        setMonster(prevMonster => ({
            ...prevMonster,
            actions: prevMonster.actions.map(action => action === actionToUpdate ? {...action, desc: newDesc} : action)
        }))
    }

    const handleAttackChange = (actionIndex, attackIndex, changes) => {
        setMonster(prevMonster => {
            const newActions = [...prevMonster.actions];

            newActions[actionIndex] = {
                ...newActions[actionIndex],
                actions: newActions[actionIndex].actions.map((attack, idx) => 
                    idx === attackIndex ? { ...attack, ...changes } : attack
                )
            }
            return { ...prevMonster, actions: newActions }
        })
    }
    
    const handleRemoveAction = (actionIndex) => {
        setMonster(prevMonster => ({
            ...prevMonster,
            actions: prevMonster.actions.filter((_, index) => index !== actionIndex)
        }));
    };

    const handleRemoveMulti = (attackIndex) => {
        if (monster.actions[0].actions[attackIndex]) {
            setMonster(prevMonster => {
                const newMulti = [...prevMonster.actions];

                newMulti[0] = {
                    ...newMulti[0],
                    actions: newMulti[0].actions.filter((_, index) => index !== attackIndex)
                }
                
                return {...prevMonster, actions: newMulti}
            });
        }
    };

    return (
        <>
            {actionList.map((act, actIndex) => (
                <React.Fragment key={actIndex}>
                    <div className={styles.formGroup}>
                        <div className={styles.btnContainer}>
                            <label>Action Name:</label>
                            <input
                                type="text"
                                value={act.name}
                                onChange={(e) => handleActionNameChange(act, e.target.value)}
                            />
                            <button 
                                type="button"
                                onClick={() => handleRemoveAction(actIndex)}
                                className={styles.removeButton}
                            >X</button>
                        </div>
                    </div>
                    <div className={styles.indent}>
                        <div className={styles.formGroup}>
                            <label>Description:</label>
                            <textarea
                                rows={3}
                                columns={10}
                                value={act.desc}
                                onChange={(e) => handleDescChange(act, e.target.value)}
                            />
                        </div>
                    </div>
                    <br />
                    <br />
                    { act.actions ? act.actions.map((attack, attackIndex) => (
                        <div key={attackIndex} className={styles.indent}>
                            <div className={styles.formGroup}>
                                <div className={styles.btnContainer}>
                                    <label>Attack Name:</label>
                                    <input
                                        type="text"
                                        value={attack.action_name}
                                        onChange={(e) => handleAttackChange(actIndex, attackIndex, { action_name: e.target.value })}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => handleRemoveMulti(attackIndex)}
                                        className={styles.removeButton}
                                    >X</button>
                                </div>
                            </div>
                            <br />
                            <div className={styles.indent}>
                                <div className={styles.formGroup}>
                                    <label>Attack Count:</label>
                                    <input
                                        type="text"
                                        value={attack.count}
                                        onChange={(e) => handleAttackChange(actIndex, attackIndex, { count: e.target.value })}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Attack Type:</label>
                                    <input
                                        type="text"
                                        value={attack.type}
                                        onChange={(e) => handleAttackChange(actIndex, attackIndex, { type: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )) : <></>}
                </React.Fragment>
            ))}
        </>
    )
}

export default Attacks;