function Conditions({ monster, onCondSelection }) {
    const condImmuns = monster.condition_immunities;

    return (
        <>
            <ul>
                {condImmuns.map((cond) => (
                    <li onClick={() => onCondSelection(cond)} key={cond}>{cond || ''}</li>
                ))}
            </ul>
        </>
    )
}

export default Conditions;