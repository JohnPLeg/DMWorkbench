import styles from "../StatPreview.module.css"
import Dropdown from "../Dropdown/Dropdown";
import SavingProf from "./Proficiencies/SavingProf/SavingProf";
import SkillProf from "./Proficiencies/SkillProf/SkillProf"
import LangProf from "./Proficiencies/LangProf/LangProf";
import { crProf } from "../../../../Data/dropdownInfo";
import { savingThrows, skills, languages } from "../../../../Data/dropdownInfo";

function ProfSection({ monster, setMonster }) {
    // updates the state of the monster object when a saving throw prof is added
    const handleSavingProfChange = (name, value) => {
        const crBonus = monster.challenge_rating ? crProf[monster.challenge_rating] : 0;
        const abilityScore = monster[value] ?? 10;
        const bonus = crBonus + Math.floor(((abilityScore) - 10) / 2);

        const existingProf = monster.proficiencies?.find(prof => 
            prof.proficiency.index === `saving-throw-${value.toLowerCase()}`
        );

        if (!existingProf) {
            console.log('Adding new proficiency');
            const newProficiency = {
                value: bonus,
                proficiency: {
                    index: `saving-throw-${value.toLowerCase()}`,
                    name: `Saving Throw: ${value}`,
                    url: `/api/2014/proficiencies/saving-throw-${value.toLowerCase()}`
                }
            };

            setMonster(prevMonster => {
                const updated = {
                    ...prevMonster,
                    proficiencies: [...(prevMonster?.proficiencies || []), newProficiency]
                };
                return updated;
            });
        }
    };

    // removes the clicked prof from the monster object
    const handleSavingClick = (value) => {
        const indexToRemove = (monster.proficiencies || []).findIndex(prof => prof.proficiency.index === `saving-throw-${value.toLowerCase()}`);

        setMonster(prevMonster => ({
            ...prevMonster,
            proficiencies: prevMonster.proficiencies.filter((_, index) => index !== indexToRemove)
        }));
    }

    // updates the state of the monster object when a saving skill prof is added
    const handleSkillProfChange = (name, value) => {
        const crBonus = monster.challenge_rating ? crProf[monster.challenge_rating] : 0;
        const abilityScore = monster[value] ?? 10;
        const bonus = crBonus + Math.floor(((abilityScore) - 10) / 2);

        const existingProf = monster.proficiencies?.find(prof => 
            prof.proficiency.index === `skill-${value.toLowerCase()}`
        );

        if (!existingProf) {
            console.log('Adding new proficiency');
            const newProficiency = {
                value: bonus,
                proficiency: {
                    index: `skill-${value.toLowerCase()}`,
                    name: `Skill: ${value}`,
                    url: `/api/2014/proficiencies/skill-${value.toLowerCase()}`
                }
            };

            setMonster(prevMonster => {
                const updated = {
                    ...prevMonster,
                    proficiencies: [...(prevMonster.proficiencies || []), newProficiency]
                };
                return updated;
            });
        }
    };

    // removes the clicked prof from the monster object
    const handleSkillClick = (value) => {
        const indexToRemove = (monster.proficiencies || []).findIndex(prof => prof.proficiency.index === `skill-${value.toLowerCase()}`);

        setMonster(prevMonster => ({
            ...prevMonster,
            proficiencies: prevMonster.proficiencies.filter((_, index) => index !== indexToRemove)
        }));
    }

    // updates the state of the monster object when a language is added
    const handleLangChange = (name, value) => {
        const langs = String(monster.languages || '').split(',').map(lang => lang.trim());

        const existingLang = langs.find(lang => lang === value);

        if (!existingLang) {
            console.log('Adding new Language');
            
            const newLangs = [...langs, value];

            setMonster(prevMonster => ({
                ...prevMonster,
                languages: newLangs.join(", ")
            }));
        }
    }

    // removes the clicked language from the monster object
    const handleLangClick = (value) => {
        const langs = String(monster.languages).split(',');
        const indexToRemove = (langs || []).findIndex(lang => lang === value);
        langs.splice(indexToRemove, 1);

        setMonster(prevMonster => ({
            ...prevMonster,
            languages: langs.join(', ')
        }))
    }

    return (
        <>
            <div className={styles.formGroup}>
                <Dropdown
                    label="Saving Throw"
                    name="savingThrow"
                    options={savingThrows}
                    value={''}
                    onChange={handleSavingProfChange}
                    placeholder="Select Saving Throw"
                />
                <SavingProf onSaveSelection={handleSavingClick} monster={monster} />
            </div>
            <div className={styles.formGroup}>
                <Dropdown
                    label="Skills"
                    name="skillProf"
                    options={skills}
                    value={''}
                    onChange={handleSkillProfChange}
                    placeholder="Select Skill"
                />
                <SkillProf onSkillSelection={handleSkillClick} monster={monster} />
            </div>
            <div className={styles.formGroup}>
                <Dropdown
                    label="Languages"
                    name="languages"
                    options={languages}
                    value={''}
                    onChange={handleLangChange}
                    placeholder="Select Language"
                />
                <LangProf onLangSelection={handleLangClick} monster={monster} />
            </div>
        </>
    )
}

export default ProfSection;