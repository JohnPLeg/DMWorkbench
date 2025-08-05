import styles from './StatBlockHome.module.css'
import Navigation from '../Navigation/Navigation';
import StatBlock from '../StatCreator/StatEditor/StatBlock/StatBlock';
import { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from "../../firebase";

function StatBlockHome() {
    const auth = getAuth();
    const [sidebar, setSidebar] = useState(true);
    const [blocks, setBlocks] = useState([]);
    const [render, setRender] = useState('');

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

    const renderBlock = (component) => {
        if (render === component) {
            setRender('');
        } else {
            setRender(component);
        }
    }

    return (
        <>
            <div className={styles.dashboard}>
                <div className={styles.sidebar} style={{width: sidebar ? '300px' : '60px'}}>
                    <button className={styles.toggleButton} onClick={toggleSidebar}>≡</button>
                    {blocks.map((statBlock) => (
                        <button 
                            key={statBlock.monster.name}
                            style={{display: sidebar ? '' : 'none'}}
                            className={styles.sidebarStat}
                            onClick={() => renderBlock(statBlock.monster.name)}
                        >{statBlock.monster.name}</button>
                    ))}
                </div>
                <div className={styles.mainPage} style={{width: sidebar ? 'calc(100vw - 300px)' : 'calc(100vw - 60px)', marginLeft: sidebar ? '300px' : '60px'}}>
                    <Navigation/>
                    {blocks.map((statBlock) => (
                        render === statBlock.monster.name && <StatBlock monster={statBlock.monster} legText={statBlock.monster?.legText || ''}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default StatBlockHome;