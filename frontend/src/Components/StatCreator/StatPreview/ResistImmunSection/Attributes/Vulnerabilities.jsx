import styles from '../ResistImmun.module.css';

function Vulnerabilities({ monster, onVulnSelection }) {

    return (
        <>
            <ul className={styles.unorderedDamageType}>
                {monster.damage_vulnerabilities?.map((vuln) => (
                    <li onClick={() => onVulnSelection(vuln)} key={vuln}>{vuln || 'test'}</li>
                ))}
            </ul>
        </>
    )
}

export default Vulnerabilities;