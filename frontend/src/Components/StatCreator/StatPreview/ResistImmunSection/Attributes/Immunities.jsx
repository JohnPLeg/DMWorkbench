import styles from '../ResistImmun.module.css';

function Immunities({ monster, onDamageSelection }) {

    return (
        <>
            <ul className={styles.unorderedDamageType}>
                {monster.damage_immunities?.map((resist) => (
                    <li onClick={() => onDamageSelection(resist)} key={resist}>{resist || 'test'}</li>
                ))}
            </ul>
        </>
    )
}

export default Immunities;