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
    const [highlighted, setHighlighted] = useState(-1)
    const emptyCreature = {
        name: '',
        count: '',
        health: '',
        armor_class: ''
    }
    const [round, setRound] = useState(0);
    
    const compare = (a, b) => b.count - a.count;

    const handleNext = () => {
        if (monsterList.length > 0) {
                setHighlighted(prev => {
                const nextIndex = prev + 1;
                if (nextIndex === monsterList.length) {
                    setRound(prevRound => prevRound + 1);
                    return 0;
                } else {
                    return nextIndex;
                }
            });
        } else {
            alert("Must have at least 1 creature!");
        }
    }

    const handleRoundReset = () => {
        setRound(0);
        setHighlighted(-1);
    }

    const handleRemove = (idx) => {
        setMonsterList(prev => (
            prev.filter((_, index) => index !== idx)
        ))
    }

    const handleSort = () => {
        setMonsterList(prev => (
            [...prev].sort((a, b) => compare(a, b))
        ))
    }

    const handleAdd = () => {
        setMonsterList(prev => (
            [...prev, emptyCreature]
        ))
    }

    const handleClear = () => {
        setMonsterList([
            emptyCreature
        ])
    }

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
                <div className={styles.gridRow}>
                    <h4>Name:</h4>
                    <h4>Initiative:</h4>
                    <h4>Health:</h4>
                    <h4>Armor Class:</h4>
                </div>
                <div className={styles.inputContainer}>
                    {monsterList.length > 0 && monsterList.map((creature, index) => (
                        <div className={styles.gridRow} key={index} style={{backgroundColor: highlighted === index ? 'rgba(47, 99, 79, 1)' : ''}}>
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
                            <button onClick={() => handleRemove(index)}>X</button>
                        </div>
                    ))}
                </div>
                <div className={styles.btnGrid}>
                    <button className={styles.nextInitBtn} onClick={handleNext}>Next</button>
                    <button className={styles.sortBtn} onClick={handleSort}>Sort</button>
                    <button className={styles.addCreatureBtn} onClick={handleAdd}>Add Creature</button>
                    <button className={styles.clearOrder} onClick={handleClear}>Clear</button>
                    <button className={styles.resetBtn} onClick={handleRoundReset}>Reset Rounds</button>
                    <div className={styles.roundNum}>
                        <h2>Round:</h2>
                        <h1>{round}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Initiative;