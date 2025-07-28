import styles from './StatSelect.module.css'
import { templateInfo } from '../../../Data/templateInfo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../Navigation/Navigation';

function StatSelect() {
    const [template, setTemplate] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={styles.mainContainer}>
            <Navigation/>
            {template ? (
                <div className={styles.container}>
                    <div className={styles.monsterCard}>
                        {templateInfo.map((monster, index) => (
                            <button onClick={() => navigate('/stat-creator', {state: { monster: `${monster}`}})} key={monster}>{monster}</button>
                        ))}
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