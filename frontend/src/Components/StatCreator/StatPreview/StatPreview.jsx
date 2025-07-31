import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import styles from './StatPreview.module.css'
import Navigation from "../../Navigation/Navigation";
import Dropdown from "./Dropdown/Dropdown";
import { size, type, armorType, savingThrows, skills, conditions, damageTypes, languages, crProf, abilityScores } from "../../../Data/dropdownInfo";
import SavingProf from "./Proficiencies/SavingProf/SavingProf";
import SkillProf from "./Proficiencies/SkillProf/SkillProf";
import LangProf from "./Proficiencies/LangProf/LangProf";
import Vulnerabilities from './Attributes/Vulnerabilities';
import Resistances from './Attributes/Resistances';
import Immunities from "./Attributes/Immunities";
import Conditions from "./Conditions/Conditions";
import Attacks from "./Attacks/Attacks";

function StatPreview() {
    const navigate = useNavigate();
    const location = useLocation();
    const monsterUrl = (location.state.monster).replaceAll(' ','-').toLowerCase();
    const [monster, setMonster] = useState({});
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState(false);
    const [selectedDamageType, setSelectedDamageType] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://www.dnd5eapi.co/api/2014/monsters/${monsterUrl}`)
                setMonster(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [monsterUrl]);

    // updates the monster object with what the user types
    const handleChange = (e) => {
        const { name, value } = e.target;

        setMonster(prevMonster => ({
            ...prevMonster,
            [name]: value
        }));
    }

    // updates the dropdown to reflect the selection
    const handleDropdownChange = (name, value) => {
        setMonster(prevMonster => ({
            ...prevMonster,
            [name]: value
        }));
    };

    // updates the state of the monster object when a saving throw prof is added
    const handleSavingProfChange = (name, value) => {
        const bonus = crProf[monster.challenge_rating] + Math.floor(((monster[value]) - 10) / 2);

        const existingProf = monster.proficiencies.find(prof => 
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
                    proficiencies: [...prevMonster.proficiencies, newProficiency]
                };
                return updated;
            });
        }
    };

    // updates the state of the monster object when a saving skill prof is added
    const handleSkillProfChange = (name, value) => {
        const bonus = crProf[monster.challenge_rating] + Math.floor(((monster[value]) - 10) / 2);

        const existingProf = monster.proficiencies.find(prof => 
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
                    proficiencies: [...prevMonster.proficiencies, newProficiency]
                };
                return updated;
            });
        }
    };
    // updates the state of the monster object when a language is added
    const handleLangChange = (name, value) => {
        const langs = monster.languages.split(',').map(lang => lang.trim());

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

    // updates the state of the monster object when a condition is added
    const handleCondImmunChange = (name, value) => {
        const condImmuns = monster.condition_immunities;
        const exists = condImmuns.find(condImmun => condImmun === value);

        if (!exists) {
            setMonster(prevMonster => ({
                ...prevMonster,
                condition_immunities: [...prevMonster.condition_immunities, value]
            }))
        }
    }

    // updates the selection in the damage type dropdown
    const handleDamageTypeChange = (name, value) => {
        setSelectedDamageType(value);
    };

    // removes the clicked prof from the monster object
    const handleSavingClick = (value) => {
        const indexToRemove = monster.proficiencies.findIndex(prof => prof.proficiency.index === `saving-throw-${value.toLowerCase()}`);

        setMonster(prevMonster => ({
            ...prevMonster,
            proficiencies: prevMonster.proficiencies.filter((_, index) => index !== indexToRemove)
        }));
    }

    // removes the clicked prof from the monster object
    const handleSkillClick = (value) => {
        const indexToRemove = monster.proficiencies.findIndex(prof => prof.proficiency.index === `skill-${value.toLowerCase()}`);

        setMonster(prevMonster => ({
            ...prevMonster,
            proficiencies: prevMonster.proficiencies.filter((_, index) => index !== indexToRemove)
        }));
    }

    // removes the clicked language from the monster object
    const handleLangClick = (value) => {
        const langs = String(monster.languages).split(',');
        const indexToRemove = langs.findIndex(lang => lang === value);
        langs.splice(indexToRemove, 1);

        setMonster(prevMonster => ({
            ...prevMonster,
            languages: langs.join(', ')
        }))
    }

    // removes the clicked vulnerability from the monster object
    const handleVulnListClick = (value) => {
        const vulns = monster.damage_vulnerabilities;
        const indexToRemove = vulns.findIndex(vuln => vuln === value);
        vulns.splice(indexToRemove, 1);

        setMonster(prevMonster => ({
            ...prevMonster,
            damage_vulnerabilities: vulns
        }))
    }

    // removes the clicked resistance from the monster object
    const handleResistListClick = (value) => {
        const resists = monster.damage_resistances;
        const indexToRemove = resists.findIndex(resist => resist === value);
        resists.splice(indexToRemove, 1);

        setMonster(prevMonster => ({
            ...prevMonster,
            damage_resistances: resists
        }))
    }

    // removes the clicked immunity from the monster object
    const handleImmunListClick = (value) => {
        const immuns = monster.damage_immunities;
        const indexToRemove = immuns.findIndex(immun => immun === value);
        immuns.splice(indexToRemove, 1);

        setMonster(prevMonster => ({
            ...prevMonster,
            damage_resistances: immuns
        }))
    }

    // removes the clicked condition immunity from the monster object
    const handleCondImmunListClick = (value) => {
        const condImmuns = monster.condition_immunities;
        const indexToRemove = condImmuns.findIndex(cond => cond === value);
        condImmuns.splice(indexToRemove, 1);

        setMonster(prevMonster => ({
            ...prevMonster,
            condition_resistances: condImmuns
        }))
    }

    const handleVulnClick = () => {
        if (!monster.damage_vulnerabilities.includes(selectedDamageType)) {
            setMonster(prevMonster => ({
                ...prevMonster,
                damage_vulnerabilities: [...prevMonster.damage_vulnerabilities, selectedDamageType]
            }))
        }
    }

    const handleResistClick = () => {
        if (!monster.damage_resistances.includes(selectedDamageType)) {
            setMonster(prevMonster => ({
                ...prevMonster,
                damage_resistances: [...prevMonster.damage_resistances, selectedDamageType]
            }))
        }
    }

    const handleImmunClick = () => {
        if (!monster.damage_immunities.includes(selectedDamageType)) {
            setMonster(prevMonster => ({
                ...prevMonster,
                damage_immunities: [...prevMonster.damage_immunities, selectedDamageType]
            }))
        }
    }

    const handleCheckbox = () => {
        checked ? setChecked(false) : setChecked(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate('/stat-creator/editor', { state: { monster }})
    }
    
    return (
        <>
            <Navigation/>
            {loading ? (
                <div className={styles.mainContainer}>
                    <div className={styles.loader}/>
                </div>
            ) : (
                <div className={styles.mainContainer}>
                    <div className={styles.btns}>
                        <div className={styles.backContainer}>
                            <button className={styles.backbtn}>Back</button>
                        </div>
                        <div className={styles.continuebtn}>
                            <button type="submit" form="statForm" >Continue</button>
                        </div>      
                    </div>
                    <form id='statForm' method='POST' onSubmit={handleSubmit}>
                        <div className={styles.partOne}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Name:</label>
                                <input 
                                    type="text"
                                    name='name'
                                    id='name'
                                    value={monster.name || ''}
                                    onChange={handleChange}
                                    placeholder="Name"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <Dropdown
                                    label="Size"
                                    name="size"
                                    options={size}
                                    value={monster.size}
                                    onChange={handleDropdownChange}
                                    placeholder="Select Size"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <Dropdown
                                    label="Type"
                                    name="type"
                                    options={type}
                                    value={monster.type}
                                    onChange={handleDropdownChange}
                                    placeholder="Select Type"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="alignment">Alignment:</label>
                                <input 
                                    type="text"
                                    name='alignment'
                                    id='alignment'
                                    value={monster.alignment || ''}
                                    onChange={handleChange}
                                    placeholder="Alignment"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="hit_dice">Hit Dice:</label>
                                <input 
                                    type="text"
                                    name='hit_dice'
                                    id='hit_dice'
                                    value={monster.hit_dice || ''}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="hit_points">Hit Points:</label>
                                <input 
                                    type="text"
                                    name='hit_points'
                                    id='hit_points'
                                    value={monster.hit_points || ''}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <Dropdown
                                    label="Armor Type"
                                    name="armorType"
                                    options={armorType}
                                    value={monster.armor_class[0].type}
                                    onChange={handleDropdownChange}
                                    placeholder="Select Armor Type"
                                />
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className={styles.partTwo}>
                            <div className={styles.formGroup}>
                                <label htmlFor="speed">Speed:</label>
                                <input 
                                    type="text"
                                    name='speed'
                                    id='speed'
                                    value={monster.speed.walk || ''}
                                    onChange={handleChange}
                                    placeholder="0 ft"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="burrowSpeed">Burrow Speed:</label>
                                <input 
                                    type="text"
                                    name='burrowSpeed'
                                    id='burrowSpeed'
                                    value={monster.speed.burrow || ''}
                                    onChange={handleChange}
                                    placeholder="0 ft."
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="climbSpeed">Climb Speed:</label>
                                <input 
                                    type="text"
                                    name='climbSpeed'
                                    id='climbSpeed'
                                    value={monster.speed.burrow || ''}
                                    onChange={handleChange}
                                    placeholder="0 ft."
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="flySpeed">Flying Speed:</label>
                                <input 
                                    type="text"
                                    name='flySpeed'
                                    id='flySpeed'
                                    value={monster.speed.fly || ''}
                                    onChange={handleChange}
                                    placeholder="0 ft."
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="swimSpeed">Swim Speed:</label>
                                <input 
                                    type="text"
                                    name='swimSpeed'
                                    id='swimSpeed'
                                    value={monster.speed.swim || ''}
                                    onChange={handleChange}
                                    placeholder="0 ft."
                                />
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className={styles.partThree}>
                            <div className={styles.formGroup}>
                                <label htmlFor="strength">Strength:</label>
                                <input 
                                    type="text"
                                    name='strength'
                                    id='strength'
                                    value={monster.strength || ''}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="dexterity">Dexterity:</label>
                                <input 
                                    type="text"
                                    name='dexterity'
                                    id='dexterity'
                                    value={monster.dexterity || ''}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="constitution">Constitution:</label>
                                <input 
                                    type="text"
                                    name='constitution'
                                    id='constitution'
                                    value={monster.constitution || ''}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="intelligence">Intelligence:</label>
                                <input 
                                    type="text"
                                    name='intelligence'
                                    id='intelligence'
                                    value={monster.intelligence || ''}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="wisdom">Wisdom:</label>
                                <input 
                                    type="text"
                                    name='wisdom'
                                    id='wisdom'
                                    value={monster.wisdom || ''}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="charisma">Charisma:</label>
                                <input 
                                    type="text"
                                    name='charisma'
                                    id='charisma'
                                    value={monster.charisma || ''}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <br />
                        <br />
                        <label>Proficiencies:</label>
                        <div className={styles.partFour}>
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
                        </div>
                        <label >Resistances and Immunities:</label>
                        <div className={styles.partFive}>
                            <div className={styles.formGroup}>
                                <Dropdown
                                    label="Damage Types"
                                    name="damageTypes"
                                    options={damageTypes}
                                    value={selectedDamageType}
                                    onChange={handleDamageTypeChange}
                                    placeholder="Select Damage Type"
                                />
                                <div className={styles.buttonGrid}>
                                    <div className={styles.vulnGrid}>
                                        <button onClick={handleVulnClick} type={'button'}>Vulnerability</button>
                                        <Vulnerabilities
                                            monster={monster}
                                            onVulnSelection={handleVulnListClick}
                                        />
                                    </div>
                                    <div className={styles.vulnGrid}>
                                        <button onClick={handleResistClick} type={'button'}>Resistance</button>
                                        <Resistances
                                            monster={monster}
                                            onResistSelection={handleResistListClick}
                                        />
                                    </div>
                                    <div className={styles.vulnGrid}>
                                        <button onClick={handleImmunClick} type={'button'}>Immunity</button>
                                        <Immunities
                                            monster={monster}
                                            onDamageSelection={handleImmunListClick}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <Dropdown
                                    label="Condition Immunities"
                                    name="conditionImmunities"
                                    options={conditions}
                                    value={''}
                                    onChange={handleCondImmunChange}
                                    placeholder="Select Condition"
                                />
                                <Conditions
                                    monster={monster}
                                    onCondSelection={handleCondImmunListClick}
                                />
                            </div>
                        </div>
                        <label >Senses:</label>
                        <div className={styles.partSix}>
                            <div className={styles.formGroup}>
                                <label htmlFor="Blindsight">Blindsight:</label>
                                <input 
                                    type="text"
                                    name='blindsight'
                                    id='blindsight'
                                    value={monster.senses.blindsight || ''}
                                    onChange={handleChange}
                                    placeholder="0 ft"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="Darkvision">Darkvision:</label>
                                <input 
                                    type="text"
                                    name='darkvision'
                                    id='darkvision'
                                    value={monster.senses.darkvision || ''}
                                    onChange={handleChange}
                                    placeholder="0 ft"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="Tremorsense">Tremorsense:</label>
                                <input 
                                    type="text"
                                    name='tremorsense'
                                    id='tremorsense'
                                    value={monster.senses.tremorsense || ''}
                                    onChange={handleChange}
                                    placeholder="0 ft"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="Truesight">Truesight:</label>
                                <input 
                                    type="text"
                                    name='truesight'
                                    id='truesight'
                                    value={monster.senses.truesight || ''}
                                    onChange={handleChange}
                                    placeholder="0 ft"
                                />
                            </div>
                        </div>
                        <label>Actions:</label>
                        <div className={styles.partSeven}>
                            <Attacks monster={monster} setMonster={setMonster}/>
                        </div>
                        <div className={styles.partEight}>
                            <div className={styles.formGroup}>
                                <div className={styles.legendBox}>
                                    <label htmlFor="checkbox">Legendary Creature:</label>
                                    <input id='checkbox' type="checkbox" onClick={handleCheckbox}/>
                                </div>
                                {checked ? (
                                    <textarea
                                        name="legendaryText"
                                        id="legendaryText"
                                        placeholder="Enter Legendary Text (e.g. abilities, actions, bonus actions, reactions, and legendary actions)"
                                        style={{display: 'block'}}     
                                    />
                                ) : (
                                    <textarea
                                        name="legendaryText"
                                        id="legendaryText"
                                        placeholder="Enter Legendary Text (e.g. abilities, actions, bonus actions, reactions, and legendary actions)"
                                        style={{display: 'none'}}     
                                    />
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default StatPreview;