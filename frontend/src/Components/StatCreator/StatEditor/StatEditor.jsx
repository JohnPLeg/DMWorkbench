import { useLocation, useNavigate } from "react-router-dom";
import styles from './StatEditor.module.css'
import Navigation from "../../Navigation/Navigation";
import StatBlock from "./StatBlock/StatBlock";
import { doc, setDoc } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { db } from "../../../firebase";


function StatCreator() {
    const navigate = useNavigate();
    const auth = getAuth();
    const location = useLocation();
    const { monster } = location.state;

    const handleNav = async () => {
        await setDoc(doc(db, 'users', auth.currentUser.uid, 'statblocks', monster.name), {
            monster
        });

        navigate('/stat-block-home');
    }
    
    return (
        <div className={styles.statCreator}>
            <Navigation/>
            <div className={styles.mainContainer}>
                <div className={styles.btns}>
                    <div className={styles.backContainer}>
                        <button className={styles.backbtn} onClick={() => navigate('/stat-select')}>Back</button>
                    </div>
                    <div className={styles.continuebtn}>
                        <button onClick={handleNav}>Continue</button>
                    </div>      
                </div>
                <StatBlock monster={monster} legText={monster?.legText}/>
            </div>
        </div>
    )
}

export default StatCreator;