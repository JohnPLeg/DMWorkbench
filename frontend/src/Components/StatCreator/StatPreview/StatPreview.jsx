import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import styles from './StatPreview.module.css'
import Navigation from "../../Navigation/Navigation";
import Dropdown from "./Dropdown/Dropdown";
import { size, type, armorType, savingThrows, skills, conditions, damageTypes, languages, crProf, abilityScores } from "../../../Data/dropdownInfo";
import SavingProf from "./Proficiencies/SavingProf/SavingProf";
import SkillProf from "./Proficiencies/SkillProf/SkillProf"

function StatPreview() {
    const location = useLocation();
    const monsterUrl = (location.state.monster).replaceAll(' ','-').toLowerCase();
    const [monster, setMonster] = useState({});
    const [loading, setLoading] = useState(true);


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
        const existingProf = monster.proficiencies.find(prof => 
            prof.proficiency.index === `saving-throw-${value.toLowerCase()}`
        );

        if (!existingProf) {
            console.log('Adding new proficiency');
            const newProficiency = {
                value: 0,
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
        const existingProf = monster.proficiencies.find(prof => 
            prof.proficiency.index === `skill-${value.toLowerCase()}`
        );

        if (!existingProf) {
            console.log('Adding new proficiency');
            const newProficiency = {
                value: 0,
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
                            <button>Continue</button>
                        </div>      
                    </div>
                    <form>
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
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}
//<SkillProf monster={monster}/>
export default StatPreview;