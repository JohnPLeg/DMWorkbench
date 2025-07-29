import styles from './SkillProf.module.css'

function SavingProf({ monster }) {
    let profSkills = [];

    monster.proficiencies.forEach((prof) => {
        if ((prof.proficiency.index).includes('skill')) {
            profSkills.push(prof.proficiency.name.replace('Skill: ', ''))
        }
    })

    const handleClick = (e) => {
        e.target.remove();
    }

    return (
        <>
            <ul>
                {profSkills.map((skill) => (
                    <li onClick={handleClick} key={skill}>{skill || 'test'}</li>
                ))}
            </ul>
        </>
    )
}   

export default SavingProf;