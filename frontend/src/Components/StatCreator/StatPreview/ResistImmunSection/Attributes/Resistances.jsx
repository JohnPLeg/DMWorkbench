import styles from '../ResistImmun.module.css';

function Resistances({ monster, onResistSelection }) {

    return (
        <>
            <ul className={styles.unorderedDamageType}>
                {monster.damage_resistances?.map((resist) => (
                    <li onClick={() => onResistSelection(resist)} key={resist}>{resist || 'test'}</li>
                ))}
            </ul>
        </>
    )
}

export default Resistances;