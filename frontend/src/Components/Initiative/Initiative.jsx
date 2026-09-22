import styles from './Initiative.module.css';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import InitiativeCard from './Card/InitiativeCard';

function Initiative() {
    const emptyCreature = {
        name: '',
        count: '',
        health: '',
        totalHealth: '',
        armor_class: ''
    }
    const [monsterList, setMonsterList] = useState([
        {
            name: 'Example',
            count: 0,
            health: 100,
            totalHealth: 100,
            armor_class: 0
        }
    ]);
    const [form, setForm] = useState({ ...emptyCreature });
    const [highlighted, setHighlighted] = useState(-1);
    const [selected, setSelected] = useState(null);
    const [delta, setDelta] = useState(1);
    const [round, setRound] = useState(0);
    const [expandedGroup, setExpandedGroup] = useState(-1);
    const [createGroup, setCreateGroup] = useState(false);
    const [groupCount, setGroupCount] = useState('');
    
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
        setSelected(null);
    }

    const handleRemove = (idx) => {
        if (monsterList.length - 1 === idx && idx === highlighted) {
            setHighlighted(0);
        }
        setSelected(prev => {
            if (!prev || prev.groupIdx !== idx) return prev;
            return null;
        });
        setExpandedGroup(prev => prev === idx ? -1 : prev);
        setMonsterList(prev => (
            prev.filter((_, index) => index !== idx)
        ))
    }

    const handleAdd = () => {
        const baseCreature = {
            name: form.name.trim() || 'Unnamed',
            count: Number(form.count) || 0,
            health: Number(form.health) || 0,
            totalHealth: Number(form.health) || 0,
            armor_class: Number(form.armor_class) || 0
        };
        const size = Number(groupCount);
        if (createGroup && size > 1) {
            const members = Array.from({ length: size }, (_, i) => ({
                ...baseCreature,
                name: `${baseCreature.name} ${i + 1}`
            }));
            setMonsterList(prev => (
                [...prev, { ...baseCreature, members }].sort(compare)
            ));
        } else {
            setMonsterList(prev => (
                [...prev, baseCreature].sort(compare)
            ));
        }
        setForm({ ...emptyCreature });
        setCreateGroup(false);
        setGroupCount('');
    }

    const handleClear = () => {
        setMonsterList([]);
        setRound(0);
        setHighlighted(-1);
        setSelected(null);
        setExpandedGroup(-1);
    }

    const incrementBy = (newValue, idxToUpdate, field) => {
        setMonsterList(prevList => (
            prevList.map((creature, index) => (
                index === idxToUpdate ? {
                    ...creature,
                    [field]: Number(creature[field]) + Number(newValue)
                } : creature
            )
        )))
    }

    const decrementBy = (newValue, idxToUpdate, field) => {
        setMonsterList(prevList => (
            prevList.map((creature, index) => (
                index === idxToUpdate ? {
                    ...creature,
                    [field]: Number(creature[field]) - Number(newValue)
                } : creature
            )
        )))
    }

    const handleHealthDelta = (delta, idx) => {
        if (delta > 0) {
            incrementBy(delta, idx, 'health');
        } else {
            decrementBy(-delta, idx, 'health');
        }
    }

    const applyMemberDelta = (newValue, gIdx, mIdx) => {
        setMonsterList(prev => (
            prev.map((creature, i) => (
                i === gIdx ? {
                    ...creature,
                    members: creature.members.map((member, j) => (
                        j === mIdx ? { ...member, health: Number(member.health) + newValue } : member
                    ))
                } : creature
            )
        )))
    }

    const handleSelect = (idx) => {
        setSelected({ groupIdx: idx, memberIdx: -1 });
    }

    const handleSelectMember = (idx, memberIdx) => {
        setSelected({ groupIdx: idx, memberIdx });
    }

    const handleRemoveMember = (gIdx, mIdx) => {
        setSelected(prev => {
            if (!prev || prev.groupIdx !== gIdx) return prev;
            if (prev.memberIdx === mIdx) return null;
            if (prev.memberIdx > mIdx) return { ...prev, memberIdx: prev.memberIdx - 1 };
            return prev;
        });
        setMonsterList(prev => (
            prev.flatMap((creature, i) => {
                if (i !== gIdx) return [creature];
                const members = creature.members.filter((_, j) => j !== mIdx);
                return members.length > 0
                    ? [{ ...creature, members }]
                    : [];
            })
        ))
    }

    const handleToggle = (idx) => {
        setExpandedGroup(prev => prev === idx ? -1 : idx);
    }

    const handleDelta = (sign) => {
        const amount = Number(delta);
        if (!amount || amount < 0) return;
        if (selected === null) {
            alert("Select a creature first!");
            return;
        }
        const { groupIdx, memberIdx } = selected;
        if (memberIdx >= 0) {
            applyMemberDelta(sign * amount, groupIdx, memberIdx);
        } else {
            handleHealthDelta(sign * amount, groupIdx);
        }
    }

    const targetName = selected === null ? null : (() => {
        const { groupIdx, memberIdx } = selected;
        const creature = monsterList[groupIdx];
        if (!creature) return null;
        if (memberIdx >= 0 && creature.members) {
            const member = creature.members[memberIdx];
            return member ? member.name : null;
        }
        return creature.name;
    })();

    return (
        <div className={styles.initContainer}>
            <Navigation/>
            <div className={styles.initHeader}>
                <button className={styles.btnGreen} onClick={handleNext}>Next Turn</button>
                <div className={styles.center}>
                    <div className={styles.alignHeader}/>
                    <p className={styles.pBold}>Round {round}</p>
                    <button className={styles.hollowBtn} onClick={handleRoundReset}>Reset Rounds</button>
                </div>
                <button className={styles.hollowBtn} onClick={handleClear}>Clear All</button>
            </div>
            <div className={styles.initBody} onClick={() => setSelected(null)}>
                <div className={styles.initList}>
                    {monsterList.map((monster, idx) =>(
                        <InitiativeCard
                            monster={monster}
                            key={idx}
                            index={idx}
                            selected={selected?.groupIdx === idx && selected?.memberIdx === -1}
                            selectedMember={selected?.groupIdx === idx ? selected.memberIdx : -1}
                            isTurn={highlighted === idx}
                            expanded={expandedGroup === idx}
                            onToggle={handleToggle}
                            onSelect={handleSelect}
                            onSelectMember={handleSelectMember}
                            onRemove={handleRemove}
                            onRemoveMember={handleRemoveMember}
                        />
                    ))}
                </div>
                <div className={styles.initCreate} onClick={(e) => e.stopPropagation()}>
                    <div>
                        <label className={styles.label}>Name</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder='e.g. Goblin, Orc'
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>
                    <div className={styles.inputGrid}>
                        <div>
                            <label className={styles.label}>Initiative</label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder='0'
                                value={form.count}
                                onChange={(e) => setForm({ ...form, count: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Health</label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder='0'
                                value={form.health}
                                onChange={(e) => setForm({ ...form, health: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className={styles.label}>Armor Class</label>
                        <input
                            type="number"
                            className={styles.input}
                            placeholder='0'
                            value={form.armor_class}
                            onChange={(e) => setForm({ ...form, armor_class: e.target.value })}
                        />
                    </div>
                    <div className={styles.centerBtn}>
                        <button className={styles.btnGreen} onClick={handleAdd}>Add to List</button>
                    </div>
                    <div className={styles.inline}>
                        <input
                            type="checkbox"
                            checked={createGroup}
                            onChange={(e) => setCreateGroup(e.target.checked)}
                        />
                        <label className={styles.label}>Create Group</label>
                        {createGroup && (
                            <input
                                type="number"
                                min="2"
                                placeholder="Size"
                                value={groupCount}
                                onChange={(e) => setGroupCount(e.target.value)}
                                className={styles.groupSize}
                            />
                        )}
                    </div>
                    <hr className={styles.line}/>
                    <p className={styles.adjustLabel}>
                        {targetName ? `Adjusting: ${targetName}` : "Select a creature to adjust"}
                    </p>
                    <div className={styles.stepper}>
                        <button
                            className={styles.crement}
                            onClick={() => handleDelta(-1)}
                        >-</button>
                        <input
                            type="number"
                            min="1"
                            value={delta}
                            onChange={(e) => setDelta(e.target.value)}
                            className={styles.deltaInput}
                        />
                        <button
                            className={styles.crement}
                            onClick={() => handleDelta(1)}
                        >+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Initiative;