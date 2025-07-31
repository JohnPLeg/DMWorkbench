

function Immunities({ monster, onDamageSelection }) {

    return (
        <>
            <ul>
                {monster.damage_immunities.map((resist) => (
                    <li onClick={() => onVulnSelection(resist)} key={resist}>{resist || 'test'}</li>
                ))}
            </ul>
        </>
    )
}

export default Immunities;