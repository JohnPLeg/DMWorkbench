import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import styles from './StatPreview.module.css'
import Navigation from "../../Navigation/Navigation";
import BasicInfo from "./BasicInfoSection/BasicInfo";
import SpeedSection from "./SpeedSection/SpeedSection";
import AbilityScores from "./AbilityScoreSection/AbilityScores";
import ProfSection from "./ProfSection/ProfSection";
import ResistImmun from "./ResistImmunSection/ResistImmun";
import Senses from "./SensesSection/Senses";
import Attacks from "./ActionSection/Attacks";
import Legendary from "./LegendarySection/Legendary";
import SpecialAbilities from "./SpecialAbilitiesSection/SpecialAbilities";

function StatPreview() {
    const navigate = useNavigate();
    const location = useLocation();
    const [monster, setMonster] = useState({});
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://www.dnd5eapi.co${location.state.monsterUrl}`)
                setMonster(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddActionClick = () => {
        const blankAction = {
            name: '',
            desc: '',
            attack_bonus: 0
        }

        setMonster(prevMonster => ({
            ...prevMonster,
            actions: [...prevMonster.actions, blankAction]
        }))
    }

    const handleAddLegActionClick = () => {
        const blankLegAction = {
            name: '',
            desc: ''
        }

        setMonster(prevMonster => ({
            ...prevMonster,
            legendary_actions: [...prevMonster.legendary_actions, blankLegAction]
        }))
    }

    const handleAddMultiClick = () => {
        if (!monster.actions.find(obj => obj.name === 'Multiattack')) {
            const blankMulti = {
                name: 'Multiattack',
                desc: '',
                actions: [{}]
            }

            setMonster(prevMonster => ({
                ...prevMonster,
                actions: [blankMulti, ...prevMonster.actions]
            }))  
        } else {
            const blankAction = {
                name: '',
                desc: '',
            }

            setMonster(prevMonster => {
                const newActions = [...prevMonster.actions];
                const lastActionIndex = newActions.length - 1;
                
                newActions[lastActionIndex] = {
                    ...newActions[lastActionIndex],
                    actions: [...newActions[lastActionIndex].actions, blankAction]
                };
                
                return { ...prevMonster, actions: newActions };
            });
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
                            <button className={styles.backbtn} onClick={() => navigate('/stat-select')}>Back</button>
                        </div>
                        <div className={styles.continuebtn}>
                            <button type="submit" form="statForm" >Continue</button>
                        </div>      
                    </div>
                    <form id='statForm' method='POST' onSubmit={handleSubmit}>
                        <div className={styles.partOne}>
                            <BasicInfo monster={monster} setMonster={setMonster}/>
                        </div>
                        <br />
                        <br />
                        <div className={styles.partTwo}>
                            <SpeedSection monster={monster} setMonster={setMonster}/>
                        </div>
                        <br />
                        <br />
                        <div className={styles.partThree}>
                            <AbilityScores monster={monster} setMonster={setMonster}/>
                        </div>
                        <br />
                        <br />
                        <label>Proficiencies:</label>
                        <div className={styles.partFour}>
                            <ProfSection monster={monster} setMonster={setMonster}/>
                        </div>
                        <label >Resistances and Immunities:</label>
                        <div className={styles.partFive}>
                            <ResistImmun monster={monster} setMonster={setMonster}/>
                        </div>
                        <label >Senses:</label>
                        <div className={styles.partSix}>
                            <Senses monster={monster} setMonster={setMonster}/>
                        </div>
                        <div className={styles.addBtn}>
                            <label>Actions:</label>
                            <button type="button" onClick={handleAddMultiClick}>Add Multiattack</button>
                            <button type="button" onClick={handleAddActionClick}>Add Action</button>
                        </div>
                        <div className={styles.partSeven}>
                            <Attacks monster={monster} setMonster={setMonster}/>
                        </div>
                        <label>Abilities:</label>
                        <div className={styles.partEight}>
                            <SpecialAbilities monster={monster} setMonster={setMonster}/>
                        </div>
                        <div className={styles.partNine}>
                            <div className={styles.formGroup}>
                                <div className={styles.legendBox}>
                                    <label htmlFor="checkbox">Legendary Creature:</label>
                                    <input id='checkbox' type="checkbox" onClick={handleCheckbox}/>
                                </div>
                                {checked ? (
                                    <>
                                        <div className={styles.addBtn}>
                                            <label>Legendary Actions:</label>
                                            <button type="button" onClick={handleAddLegActionClick}>Add Action</button>
                                        </div>
                                        <textarea
                                            name="legendaryText"
                                            id="legendaryText"
                                            placeholder="The monster can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The monster regains spent legendary actions at the start of its turn."
                                            style={{display: 'block'}}     
                                        />
                                        <Legendary monster={monster} setMonster={setMonster}/>
                                    </>
                                ) : (
                                    <textarea
                                        name="legendaryText"
                                        placeholder="The monster can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The monster regains spent legendary actions at the start of its turn."
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