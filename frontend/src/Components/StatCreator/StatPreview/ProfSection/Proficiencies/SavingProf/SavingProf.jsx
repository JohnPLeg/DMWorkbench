import styles from './SavingProf.module.css'

function SavingProf({ monster, onSaveSelection }) {
    let profThrows = [];

    monster.proficiencies.forEach((prof) => {
        if (prof.proficiency.index.includes('saving-throw')) {
            profThrows.push(prof.proficiency.name.replace('Saving Throw: ', ''))
        }
    })

    return (
        <>
            <ul>
                {profThrows.map((save) => (
                    <li onClick={() => onSaveSelection(save)} key={save}>{save || 'test'}</li>
                ))}
            </ul>
        </>
    )
}

export default SavingProf;