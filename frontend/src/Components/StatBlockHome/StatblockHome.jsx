import styles from './StatBlockHome.module.css'
import Navigation from '../Navigation/Navigation';
import StatBlock from '../StatCreator/StatEditor/StatBlock/StatBlock';
import { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../../firebase";

function StatBlockHome() {
    const auth = getAuth();
    const [sidebar, setSidebar] = useState(true);
    const [blocks, setBlocks] = useState([]);
    const [render, setRender] = useState('');
    const [toggleEdit, setToggleEdit] = useState(false);

    const getBlocks = async () => {
        const q = query(collection(db, 'users', auth.currentUser.uid, 'statblocks'));
        const qSnapshot = await getDocs(q);

        const fetchedBlocks = [];
        qSnapshot.forEach((block) => {
            fetchedBlocks.push(block.data());
        })

        sessionStorage.setItem('monsters', fetchedBlocks);
        setBlocks(fetchedBlocks);
    }

    useEffect(() => {
        if (sessionStorage.getItem('monsters')) {
            setBlocks(sessionStorage.getItem('monsters'))
        } else {
            getBlocks();
        }
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

    const handleEdit = () => {
        setToggleEdit(toggleEdit ? false : true);
    }

    const handleRemove = async (name) => {
        try {
            await deleteDoc(doc(db, 'users', auth.currentUser.uid, 'statblocks', name));
            setBlocks(blocks.filter(item => item.monster.name !== name));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className={styles.dashboard}>
                <div className={styles.sidebar} style={{width: sidebar ? '300px' : '60px'}}>
                    <button className={styles.toggleButton} onClick={toggleSidebar}>≡</button>
                    {blocks.map((statBlock) => (
                        <div className={styles.blockBtn} key={statBlock.monster.name}>
                            <button 
                                style={{display: sidebar ? '' : 'none'}}
                                className={styles.sidebarStat}
                                onClick={() => renderBlock(statBlock.monster.name)}
                            >{statBlock.monster.name}</button>
                            <button 
                                className={styles.removeBtn} 
                                style={{display: sidebar && toggleEdit ? '' : 'none'}}
                                onClick={() => handleRemove(statBlock.monster.name)}
                            >X</button>
                        </div>
                    ))}
                    <button
                        className={styles.editBtn}
                        style={{display: sidebar ? '' : 'none'}}
                        onClick={handleEdit}
                    >✎</button>
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