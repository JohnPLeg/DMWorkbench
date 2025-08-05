import styles from './StatBlockHome.module.css'
import { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from "../../firebase";

function StatBlockHome() {
    const auth = getAuth();
    const [sidebar, setSidebar] = useState(false);
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        const getBlocks = async () => {
            const q = query(collection(db, 'users', auth.currentUser.uid, 'statblocks'));
            const qSnapshot = await getDocs(q);

            const fetchedBlocks = [];
            qSnapshot.forEach((block) => {
                fetchedBlocks.push(block.data());
            })

            setBlocks(fetchedBlocks);
        }
        getBlocks();
    }, [])

    const toggleSidebar = () => {
        setSidebar(sidebar ? false : true);
        console.log(blocks);
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.sidebar} style={{width: sidebar ? '300px' : '60px'}}>
                <button className={styles.toggleButton} onClick={toggleSidebar}>≡</button>
                {blocks.map((statBlock) => (
                    <button 
                        key={statBlock.monster.name}
                        style={{display: sidebar ? '' : 'none'}}
                        className={styles.sidebarStat}
                    >{statBlock.monster.name}</button>
                ))}
            </div>

            <div className={styles.mainPage} style={{width: sidebar ? 'calc(100vw - 300px)' : 'calc(100vw - 60px)', marginLeft: sidebar ? '300px' : '60px'}}>
                <h1>Main Page</h1>
            </div>
        </div>
    )
}

export default StatBlockHome;