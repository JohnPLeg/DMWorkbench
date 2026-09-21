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
    const [increment, setIncrement] = useState(0)
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
        if (monsterList.length - 1 === idx && idx === highlighted) {
            setHighlighted(0);
        }
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

    const incrementBy = (newValue, idxToUpdate, field) => {
        setMonsterList(prevList => (
            prevList.map((creature, index) => (
                index === idxToUpdate ? {
                    ...creature,
                    [field]: Number(creature.health) + Number(newValue)
                } : creature
            )
        )))
    }

    const decrementBy = (newValue, idxToUpdate, field) => {
        setMonsterList(prevList => (
            prevList.map((creature, index) => (
                index === idxToUpdate ? {
                    ...creature,
                    [field]: Number(creature.health) - Number(newValue)
                } : creature
            )
        )))
    }

    return (
        <>
            <Navigation/>
            <div className={styles.initHeader}>
                <button className={styles.btnGreen}>Next Turn</button>
                <div className={styles.inline}>
                    <div className={styles.alignHeader}/>
                    <p className={styles.pBold}>Round {round}</p>
                    <button className={styles.hollowBtn}>Reset Rounds</button>
                </div>
                <button className={styles.hollowBtn}>Clear All</button>
            </div>
            <div className={styles.initBody}>
                <div className={styles.initList}>

                </div>
                <div className={styles.initCreate}>

                </div>
            </div>
        </>
    )
}

export default Initiative;