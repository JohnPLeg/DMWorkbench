import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
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
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [monster, setMonster] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false); 
    const [legText, setLegText] = useState("The monster can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The monster regains spent legendary actions at the start of its turn.");


    useEffect(() => {
        if (location.state?.route === 'template') {
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
        } else if (location.state?.route === 'empty') {
            setLoading(false);
            return
        } else if (location.state?.route === 'backBtn') {
            setMonster(location.state.monster);
            setLoading(false);
        } else if (location.state?.route === 'fromDash') {
            const editMonster = sessionStorage.getItem('editMonster');
            if (editMonster) {
                const parsed = JSON.parse(editMonster);
                setMonster(parsed.monster);
                sessionStorage.removeItem('editMonster');
            }
            setLoading(false);
        } else {
            const fetchStatBlock = async () => {
                try {
                    statBlock = await getDoc(doc(db, "users", auth.currentUser.uid, 'statblocks', location.state?.monsterName));

                    if (statBlock.exists()) {
                        setMonster(statBlock);
                    } else {
                        console.log("No Doc Found")
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            fetchStatBlock();
        }
    }, []);

    const handleAddActionClick = () => {
        const blankAction = {
            name: '',
            desc: '',
            attack_bonus: 0
        }

        setMonster(prevMonster => ({
            ...prevMonster,
            actions: [...prevMonster.actions || [], blankAction]
        }))
    }

    const handleAddLegActionClick = () => {
        const blankLegAction = {
            name: '',
            desc: ''
        }

        setMonster(prevMonster => ({
            ...prevMonster,
            legendary_actions: [...prevMonster.legendary_actions || [], blankLegAction]
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
                actions: [blankMulti, ...prevMonster.actions || []]
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

    const handleAddAbilityClick = () => {
        const blankAbility = {
            name: '',
            desc: '',
        }

        setMonster(prevMonster => ({
            ...prevMonster,
            special_abilities: [...prevMonster.special_abilities || [], blankAbility]
        }))
    }

    const handleLegTextChange = (e) => {
        setMonster(prev => ({
            ...prev,
            legText: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loadingPage(true);

        try {
            navigate('/stat-creator/editor', { 
                state: { 
                    monster,
                    legText
                }
            })
        } finally {
            loadingPage(false);
        }
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
                            <button 
                                type="submit" 
                                form="statForm"
                                disabled={loadingPage} 
                                style={loadingPage ? { opacity: 0.5, pointerEvents: 'none' } : {}}
                            >Continue</button>
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
                        <div className={styles.partEight}>
                            <div className={styles.addBtn}>
                                <label>Abilities:</label>
                                <button type="button" onClick={handleAddAbilityClick}>Add Ability</button>
                            </div>
                            <SpecialAbilities monster={monster} setMonster={setMonster}/>
                        </div>
                        <div className={styles.partNine}>
                            <div className={styles.formGroup}>
                                <div className={styles.addBtn}>
                                    <label>Legendary Actions:</label>
                                    <button type="button" onClick={handleAddLegActionClick}>Add Action</button>
                                </div>
                                {monster?.legendary_actions?.length > 0 ? (
                                    <>
                                        <textarea
                                            name="legendaryText"
                                            id="legendaryText"
                                            value={monster?.legText || legText}
                                            onChange={handleLegTextChange}
                                            placeholder="The monster can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The monster regains spent legendary actions at the start of its turn."   
                                        />
                                        <Legendary monster={monster} setMonster={setMonster}/>
                                    </>
                                ) : (<></>)}
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default StatPreview;