

function Immunities({ monster, onDamageSelection }) {

    return (
        <>
            <ul>
                {monster.damage_immunities.map((resist) => (
                    <li onClick={() => onDamageSelection(resist)} key={resist}>{resist || 'test'}</li>
                ))}
            </ul>
        </>
    )
}

export default Immunities;