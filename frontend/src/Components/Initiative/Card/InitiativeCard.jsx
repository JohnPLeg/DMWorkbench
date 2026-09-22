import { useState, useEffect, useRef } from 'react';
import styles from './InitiativeCard.module.css';

export default function InitiativeCard({ monster, index, selected, selectedMember, isTurn, expanded, onToggle, onSelect, onSelectMember, onRemove, onRemoveMember }) {
    const isGroup = Boolean(Array.isArray(monster.members) && monster.members.length > 0);
    const maxHealth = Number(monster.totalHealth) || Number(monster.health) || 1;
    const [currentHealth, setCurrentHealth] = useState(Number(monster.health) || 0);
    const [delayedHealth, setDelayedHealth] = useState(Number(monster.health) || 0);
    const timeoutRef = useRef(null);
    const prevHealthRef = useRef(Number(monster.health) || 0);

    useEffect(() => {
        const newHealth = Number(monster.health) || 0;
        const prevHealth = prevHealthRef.current;
        const difference = newHealth - prevHealth;
        prevHealthRef.current = newHealth;

        setCurrentHealth(newHealth);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (difference < 0) {
            timeoutRef.current = setTimeout(() => {
                setDelayedHealth(newHealth);
                timeoutRef.current = null;
            }, 300);
        } else {
            setDelayedHealth(newHealth);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [monster.health]);

    const currentPct = (currentHealth / maxHealth) * 100;
    const delayedPct = (delayedHealth / maxHealth) * 100;

    const alive = isGroup ? monster.members.filter((m) => Number(m.health) > 0).length : null;
    const groupPct = isGroup ? (alive / monster.members.length) * 100 : 0;

    return (
        <div
            className={`${styles.card}${isTurn ? ` ${styles.isTurn}` : ''}${selected ? ` ${styles.selected}` : ''}`}
            onClick={(e) => { e.stopPropagation(); isGroup ? onToggle(index) : onSelect(index); }}
        >
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    {isTurn && <span className={styles.turnTag}>TURN</span>}
                    <p className={styles.init}>{monster.count}</p>
                    <h3 className={styles.name}>{monster.name}</h3>
                    {isGroup && <span className={styles.countBadge}>× {monster.members.length}</span>}
                    {isGroup && (
                        <span className={`${styles.chevron}${expanded ? ` ${styles.chevronOpen}` : ''}`}>▸</span>
                    )}
                </div>
                <div className={styles.headerRight}>
                    <span className={styles.acChip}>AC {monster.armor_class}</span>
                    <button className={styles.trash} onClick={(e) => { e.stopPropagation(); onRemove(index); }}>Trash</button>
                </div>
            </div>
            <div className={styles.body}>
                <p className={styles.hpText}>
                    {isGroup ? `${alive}/${monster.members.length} alive` : `HP ${monster.health}/${monster.totalHealth}`}
                </p>
                <div className={styles.track}>
                    {isGroup ? (
                        <div className={styles.greenBar} style={{ width: `${groupPct}%` }} />
                    ) : (
                        <>
                            <div
                                className={styles.redBar}
                                style={{ width: `${Math.max(0, delayedPct)}%` }}
                            />
                            <div
                                className={styles.greenBar}
                                style={{ width: `${Math.max(0, currentPct)}%` }}
                            />
                        </>
                    )}
                </div>
            </div>
            {isGroup && expanded && (
                <div className={styles.members}>
                    {monster.members.map((m, mIdx) => (
                        <div
                            key={mIdx}
                            className={`${styles.member}${selectedMember === mIdx ? ` ${styles.memberSelected}` : ''}`}
                            onClick={(e) => { e.stopPropagation(); onSelectMember(index, mIdx); }}
                        >
                            <p className={styles.memberName}>{m.name}</p>
                            <div className={styles.memberTrack}>
                                <div
                                    className={styles.memberBar}
                                    style={{ width: `${Math.max(0, (Number(m.health) / (Number(m.totalHealth) || Number(m.health) || 1)) * 100)}%` }}
                                />
                            </div>
                            <p className={styles.memberHp}>{m.health}/{m.totalHealth}</p>
                            <button
                                className={styles.memberTrash}
                                onClick={(e) => { e.stopPropagation(); onRemoveMember(index, mIdx); }}
                            >✕</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}