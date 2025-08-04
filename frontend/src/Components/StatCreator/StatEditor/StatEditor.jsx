import { useLocation } from "react-router-dom";
import styles from './StatEditor.module.css'
import Navigation from "../../Navigation/Navigation";

function StatCreator() {
    const location = useLocation();
    const { monster, legText } = location.state;

    
    
    return (
        <div className={styles.statCreator}>
            <Navigation/>
            <div className={styles.mainContainer}>
                <div className={styles.btns}>
                    <div className={styles.backContainer}>
                        <button className={styles.backbtn} onClick={() => navigate('/stat-select')}>Back</button>
                    </div>
                    <div className={styles.continuebtn}>
                        <button>Continue</button>
                    </div>      
                </div>
                <div className={styles.statBlockWrapper}>
                    <div className={styles.statBlock}>
                        <hr className={styles.border}/>
                        <div className={styles.sectionLeft}>
                            <div className={styles.creatureHeading}>
                                <h1 className={styles.monsterName} >{monster.name}</h1>
                                <h2>{monster.size} {monster.type}, {monster.alignment}</h2>
                            </div>
                            <svg height='5' width="100%" className={styles.rule}>
                                <polyline points="0,0 400,2.5 0,5"></polyline>
                            </svg>
                            <div className={styles.topStats}>
                                <div className={`${styles.propertyLine} ${styles.first}`}>
                                    <h4>Armor Class</h4>
                                    <p className={styles.armorClass}>{monster.armor_class[0].value}</p>
                                </div>
                                <div className={styles.propertyLine}>
                                    <h4>Hit Points</h4>
                                    <p className={styles.hitPoints}>{monster.hit_points}   ({monster.hit_dice})</p>
                                </div>
                                <div className={`${styles.propertyLine} ${styles.last}`}>
                                    <h4>Speed</h4>
                                    <p className={styles.speed}>{monster.speed.walk}</p>
                                </div>
                                <svg height='5' width="100%" className={styles.rule}>
                                    <polyline points="0,0 400,2.5 0,5"></polyline>
                                </svg>
                                <div className={styles.scores}>
                                    <div className={styles.strength}>
                                        <h4>STR</h4>
                                        <p>{monster.strength} ({Math.floor((monster.strength - 10) / 2) >= 0 ? (
                                            `+${Math.floor((monster.strength - 10) / 2)}`
                                            ) : (
                                                Math.floor((monster.strength - 10) / 2)
                                            )})
                                        </p>
                                    </div>
                                    <div className={styles.dexterity}>
                                        <h4>DEX</h4>
                                        <p>{monster.dexterity} ({Math.floor((monster.dexterity - 10) / 2) >= 0 ? (
                                            `+${Math.floor((monster.dexterity - 10) / 2)}`
                                            ) : (
                                                Math.floor((monster.dexterity - 10) / 2)
                                            )})
                                        </p>
                                    </div>
                                    <div className={styles.constitution}>
                                        <h4>CON</h4>
                                        <p>{monster.constitution} ({Math.floor((monster.constitution - 10) / 2) >= 0 ? (
                                            `+${Math.floor((monster.constitution - 10) / 2)}`
                                            ) : (
                                                Math.floor((monster.constitution - 10) / 2)
                                            )})
                                        </p>
                                    </div>
                                    <div className={styles.intelligence}>
                                        <h4>INT</h4>
                                        <p>{monster.intelligence} ({Math.floor((monster.intelligence - 10) / 2) >= 0 ? (
                                            `+${Math.floor((monster.intelligence - 10) / 2)}`
                                            ) : (
                                                Math.floor((monster.intelligence - 10) / 2)
                                            )})
                                        </p>
                                    </div>
                                    <div className={styles.wisdom}>
                                        <h4>WIS</h4>
                                        <p>{monster.wisdom} ({Math.floor((monster.wisdom - 10) / 2) >= 0 ? (
                                            `+${Math.floor((monster.wisdom - 10) / 2)}`
                                            ) : (
                                                Math.floor((monster.wisdom - 10) / 2)
                                            )})
                                        </p>
                                    </div>
                                    <div className={styles.charisma}>
                                        <h4>CHA</h4>
                                        <p>{monster.charisma} ({Math.floor((monster.charisma - 10) / 2) >= 0 ? (
                                            `+${Math.floor((monster.charisma - 10) / 2)}`
                                            ) : (
                                                Math.floor((monster.charisma - 10) / 2)
                                            )})
                                        </p>
                                    </div>
                                </div>    
                                <svg height='5' width="100%" className={styles.rule}>
                                    <polyline points="0,0 400,2.5 0,5"></polyline>
                                </svg>
                                <div className={styles.propList}>
                                    <div className={`${styles.propertyLine} ${styles.first}`}>
                                        <div>
                                            <h4>Senses</h4>
                                            <p>Passive Perception {monster.senses.passive_perception}</p>
                                        </div>
                                    </div>
                                    <div className={styles.propertyLine}>
                                        <div>
                                            <h4>Languages</h4>
                                            <p>{monster.languages}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.crRatingLine} ${styles.last}`}>
                                    <h4>Challenge</h4>
                                    <p>{monster.challenge_rating} ({monster.xp} XP)</p>
                                </div>
                            </div>
                            <svg height='5' width="100%" className={styles.rule}>
                                <polyline points="0,0 400,2.5 0,5"></polyline>
                            </svg>
                            <div className={styles.actions}>
                                <div className={styles.traitsListLeft}>
                                    {monster.special_abilities.map((ability) => (
                                        <div key={ability.name} className={styles.inlineText}>
                                            <div>
                                                <h4>{ability.name}.</h4>
                                                <p>{ability.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.traitsListLeft}>
                                    <h3>Actions:</h3>
                                    {monster.actions.map((act) => (
                                        <div key={act.name} className={styles.inlineText}>
                                            <h4>{act.name}</h4>
                                            <p>{act.desc}</p>
                                        </div>  
                                    ))}
                                </div>
                                <div className={styles.traitsListLeft}>
                                    {monster.legendary_actions.length > 0 ? (
                                        <>
                                            <h3>Legendary Actions:</h3>
                                            <p>{legText}</p>
                                            {monster.legendary_actions.map((legAct) => (
                                                <div key={legAct.name} className={styles.inlineText}>
                                                    <h4>{legAct.name}</h4>
                                                    <p>{legAct.desc}</p>
                                                </div>  
                                            ))}
                                        </>
                                    ) : (<></>)}
                                </div>
                            </div>
                        </div>
                        <div className={styles.sectionRight}>
                            <div className={styles.actions}>
                                <div className={styles.traitsListRight}>
                                    <div className={styles.propertyBlock}>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className={`${styles.border} ${styles.bottom}`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatCreator;