

function Vulnerabilities({ monster, onVulnSelection }) {

    return (
        <>
            <ul>
                {monster.damage_vulnerabilities?.map((vuln) => (
                    <li onClick={() => onVulnSelection(vuln)} key={vuln}>{vuln || 'test'}</li>
                ))}
            </ul>
        </>
    )
}

export default Vulnerabilities;