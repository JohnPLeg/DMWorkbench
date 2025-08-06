import styles from './StatSelect.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../Navigation/Navigation';
import axios from 'axios';

function StatSelect() {
    const [templateInfo, setTemplateInfo] = useState({});
    const [template, setTemplate] = useState(false);
    const [openDropdown, setOpenDropdown] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://www.dnd5eapi.co/api/2014/monsters')
                setTemplateInfo(res.data.results);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const toggleDropdown = (letter) => {
        setOpenDropdown(openDropdown === letter ? '' : letter);
    }
    
    function renderDropdown(letter) {
        if (!letter || openDropdown !== letter) return null

        return (
            <div className={styles.monsterCard} key={letter}>
                <div className={styles.dropdown}>
                    <div className={styles.dropdownContent}>
                        {templateInfo.map((monster, index) => {
                            if (monster.name[0] === letter) {
                                return (
                                    <a 
                                        onClick={() => navigate('/stat-creator/preview', {state: { 
                                            monsterUrl: monster.url,
                                            route: 'template'
                                        }})} 
                                        key={monster.name}
                                    >
                                        {monster.name}
                                    </a>
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.mainContainer}>
            <Navigation/>
            {template ? (
                <div className={styles.container}>
                    <div className={styles.templateContainer}>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(letter => 
                            <button key={letter} onClick={() => toggleDropdown(letter)}>{letter}</button>
                        )}
                    </div>
                    {renderDropdown(openDropdown)}
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.card} onClick={() => navigate('/stat-creator/preview', {state: {route: 'empty'}})}>
                        <h1>Start From Scratch</h1>
                        <p>Start your custom stat block from scratch inputting all information</p>
                    </div>
                    <div className={styles.card} onClick={() => {setTemplate(true)}}>
                        <h1>Start From Template</h1>
                        <p>Start your custom stat block from a template from any monster available in the Wizards of the Coast SRD License</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StatSelect;