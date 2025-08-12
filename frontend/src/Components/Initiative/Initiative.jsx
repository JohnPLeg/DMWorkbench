import styles from './Initiative.module.css';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';

function Initiative() {
    const [monsterList, setMonsterList] = useState([
        {
            name: 'Example',
            count: 0,
            health: 0,
            armor_class: 0
        }
    ]);

    const handleUpdate = (newValue, idxToUpdate, field) => {
        setMonsterList(prevList => (
            prevList.map((creature, index) => (
                index === idxToUpdate ? {
                    ...creature,
                    [field]: newValue
                } : creature
            )
        )))
    }

    return (
        <>
            <Navigation/>
            <div className={styles.trackerContainer}>
                <div className={styles.titles}>
                    <h4 className={styles.name} >Name:</h4>
                    <h4>Initiative:</h4>
                    <h4>Health:</h4>
                    <h4>Armor Class:</h4>
                </div>
                <div className={styles.inputContainer}>
                    {monsterList.length > 0 && monsterList.map((creature, index) => (
                        <div className={styles.initInputs} key={index}>
                            <input 
                                type='text' 
                                value={creature.name} 
                                placeholder='Creature Name...'
                                onChange={(e) => handleUpdate(e.target.value, index, 'name')}
                                className={styles.creatureName}
                            />
                            <input 
                                type="number" 
                                value={creature.count} 
                                placeholder='0'
                                onChange={(e) => handleUpdate(e.target.value, index, 'count')}
                                className={styles.creatureCount}
                            />
                            <input 
                                type="number" 
                                value={creature.health} 
                                placeholder='0'
                                onChange={(e) => handleUpdate(e.target.value, index, 'health')}
                                className={styles.creatureHealth}
                            />
                            <input 
                                type="number" 
                                value={creature.armor_class} 
                                placeholder='0'
                                onChange={(e) => handleUpdate(e.target.value, index, 'armor_class')}
                                className={styles.creatureAC}
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.btnGrid}>
                    <button className={styles.nextInitBtn}>Next</button>
                    <button className={styles.sortBtn}>Sort</button>
                    <button className={styles.addCreatureBtn}>Add Creature</button>
                    <button className={styles.clearOrder}>Clear Order</button>
                    <button className={styles.resetBtn}>Reset Rounds</button>
                </div>
            </div>
        </>
    )
}

export default Initiative;