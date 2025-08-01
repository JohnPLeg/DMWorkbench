

function Resistances({ monster, onResistSelection }) {

    return (
        <>
            <ul>
                {monster.damage_resistances.map((resist) => (
                    <li onClick={() => onResistSelection(resist)} key={resist}>{resist || 'test'}</li>
                ))}
            </ul>
        </>
    )
}

export default Resistances;