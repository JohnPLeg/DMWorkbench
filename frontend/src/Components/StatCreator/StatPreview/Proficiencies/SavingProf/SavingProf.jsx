import styles from './SavingProf.module.css'

function SavingProf({ monster, onSelection }) {
    let profThrows = [];

    monster.proficiencies.forEach((prof) => {
        if (prof.proficiency.index.includes('saving-throw')) {
            profThrows.push(prof.proficiency.name.replace('Saving Throw: ', ''))
        }
    })

    return (
        <>
            <ul id={styles.savingProfList}>
                {profThrows.map((save) => (
                    <li onClick={() => onSelection(save)} key={save}>{save || 'test'}</li>
                ))}
            </ul>
        </>
    )
}

export default SavingProf;