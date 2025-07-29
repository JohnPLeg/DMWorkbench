import styles from './SkillProf.module.css'

function SavingProf({ monster, onSkillSelection }) {
    let profSkills = [];

    monster.proficiencies.forEach((prof) => {
        if ((prof.proficiency.index).includes('skill')) {
            profSkills.push(prof.proficiency.name.replace('Skill: ', ''))
        }
    })

    return (
        <>
            <ul>
                {profSkills.map((skill) => (
                    <li onClick={() => onSkillSelection(skill)} key={skill}>{skill || 'test'}</li>
                ))}
            </ul>
        </>
    )
}   

export default SavingProf;