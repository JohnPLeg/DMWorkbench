import styles from './StatSelect.module.css'
import { templateInfo } from '../../../Data/templateInfo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../Navigation/Navigation';

function StatSelect() {
    const [template, setTemplate] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();
    
    function dropdown(letter) {
        const isOpen = openDropdown === letter;
        
        return (
            <div className={styles.monsterCard} key={letter}>
                <div className={styles.dropdown}>
                    <button 
                        className={styles.dropbtn} 
                        onClick={() => setOpenDropdown(isOpen ? null : letter)}
                    >
                        {letter} {isOpen ? '▲' : '▼'}
                    </button>
                    <div className={`${styles.dropdownContent} ${isOpen ? styles.show : styles.hide}`}>
                        {templateInfo.map((monster, index) => {
                            if (monster[0] === letter) {
                                return (
                                    <a 
                                        onClick={() => navigate('/stat-creator/preview', {state: { monster: `${monster}`}})} 
                                        key={monster}
                                    >
                                        {monster}
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
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(letter => dropdown(letter))}
                    </div>
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.card}>
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