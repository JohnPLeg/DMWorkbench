import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import styles from './StatPreview.module.css'
import Navigation from "../../Navigation/Navigation";
import Dropdown from "./Dropdown/Dropdown";
import { size, type, armorType, savingThrows, skills, conditions, damageTypes, languages } from "../../../Data/dropdownInfo";

function StatPreview() {
    const location = useLocation();
    const monsterUrl = (location.state.monster).replaceAll(' ','-').toLowerCase();
    const [monster, setMonster] = useState({});
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');


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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMonster(prevMonster => ({
            ...prevMonster,
            [name]: value
        }));
    }

    const handleDropdownChange = (name, value) => {
        setMonster(prevMonster => ({
            ...prevMonster,
            [name]: value
        }));
    };
    
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
                        <Dropdown
                            label="Size"
                            name="size"
                            options={size}
                            value={monster.size}
                            onChange={handleDropdownChange}
                            placeholder="Select Size"
                        />
                        <Dropdown
                            label="Type"
                            name="type"
                            options={type}
                            value={monster.type}
                            onChange={handleDropdownChange}
                            placeholder="Select Type"
                        />
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
                                placeholder="Hit Dice"
                            />
                        </div>
                        <Dropdown
                            label="Armor Type"
                            name="armorType"
                            options={armorType}
                            value={monster.armor_class[0].type}
                            onChange={handleDropdownChange}
                            placeholder="Select Armor Type"
                        />
                    </form>
                </div>
            )}
        </>
    )
}

export default StatPreview;