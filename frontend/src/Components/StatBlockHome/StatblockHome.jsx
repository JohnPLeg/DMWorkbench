import styles from './StatBlockHome.module.css'
import Navigation from '../Navigation/Navigation';
import StatBlock from '../StatCreator/StatEditor/StatBlock/StatBlock';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../../firebase";

function StatBlockHome() {
    const navigate = useNavigate();
    const auth = getAuth();
    const [sidebar, setSidebar] = useState(true);
    const [blocks, setBlocks] = useState([]);
    const [render, setRender] = useState('');
    const [toggleEdit, setToggleEdit] = useState(false);

    function comapare(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1
        }
        return 0;
    }

    const getBlocks = async () => {
        const q = query(collection(db, 'users', auth.currentUser.uid, 'statblocks'));
        const qSnapshot = await getDocs(q);

        const fetchedBlocks = [];
        qSnapshot.forEach((block) => {
            fetchedBlocks.push(block.data());
        })

        fetchedBlocks.sort( comapare );

        sessionStorage.setItem('monsters', JSON.stringify(fetchedBlocks));
        setBlocks(fetchedBlocks);
    }

    useEffect(() => {
        const storedBlocks = sessionStorage.getItem('monsters');
        const toRefresh = sessionStorage.getItem('refresh');

        if (toRefresh) {
            getBlocks();
            sessionStorage.removeItem('refresh');
        } else if (storedBlocks) {
            setBlocks(JSON.parse(storedBlocks))
        } else {
            getBlocks();
        }
    }, [])

    useEffect(() => {
        if (blocks.length > 0) {
            sessionStorage.setItem('monsters', JSON.stringify(blocks));
        }
    }, [blocks])

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

    const handleEditMode = () => {
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

    const handleNavEditor = (statBlock) => {
        sessionStorage.setItem('editMonster', JSON.stringify(statBlock));
        sessionStorage.setItem('originalName', JSON.stringify(statBlock.monster.name));
        navigate('/stat-creator/preview', {state: { route: 'fromDash'}})
    }

    return (
        <>
            <div className={styles.dashboard}>
                <div className={styles.sidebar} style={{width: sidebar ? '300px' : '60px'}}>
                    <button className={styles.toggleButton} onClick={toggleSidebar}>≡</button>
                    <div className={styles.monsterList}>
                        {blocks.length > 0 ? (blocks.map((statBlock) => (
                            <div className={styles.blockBtn} key={statBlock.monster.name}>
                                <button 
                                    className={styles.changeBlockBtn} 
                                    style={{display: sidebar && toggleEdit ? '' : 'none'}}
                                    onClick={() => handleNavEditor(statBlock)}
                                >✎</button>
                                <button 
                                    style={{display: sidebar ? '' : 'none', borderRadius: sidebar && toggleEdit ? '': '10px'}}
                                    className={styles.sidebarStat}
                                    onClick={() => renderBlock(statBlock.monster.name)}
                                >{statBlock.monster.name}</button>
                                <button 
                                    className={styles.removeBtn} 
                                    style={{display: sidebar && toggleEdit ? '' : 'none'}}
                                    onClick={() => handleRemove(statBlock.monster.name)}
                                >X</button>
                            </div>
                        ))) : (<></>)}
                    </div>
                    <button
                        className={styles.editBtn}
                        style={{display: sidebar ? '' : 'none'}}
                        onClick={handleEditMode}
                    >Edit</button>
                </div>
                <div className={styles.mainPage} style={{width: sidebar ? 'calc(100vw - 300px)' : 'calc(100vw - 60px)', marginLeft: sidebar ? '300px' : '60px'}}>
                    <Navigation/>
                    {blocks.map((statBlock) => (
                        render === statBlock.monster.name && <StatBlock key={statBlock.monster.name} monster={statBlock.monster} legText={statBlock.monster?.legText || ''}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default StatBlockHome;