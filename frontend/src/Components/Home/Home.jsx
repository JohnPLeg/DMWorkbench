import { UserContext } from "../../Context/UserContext";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { cardInfo } from "../../Data/cardInfo";
import Card from "../Card/Card";
import axios from 'axios';
import styles from './Home.module.css'

function Home () {
    const { user, login, logout } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [passcode, setPasscode] = useState('');
    const navigate = useNavigate();

    const handleUser = (e) => {
        setUsername(e.target.value);
    }

    const handlePass = (e) => {
        setPasscode(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('/user', {
            params: {
                user: username,
                password: passcode
            }
        })
        .then(response => {
            
            if (response.data.loggedIn) {
                login(username);
                navigate('/chatroom');
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className={styles.gradient}>
            <div className={styles.imgContainer}>
                <img className={styles.banner} src="logo.png"/>
            </div>
            <div className={styles.container}>
                <div className={styles.cards}>
                    {cardInfo.map((card, index) => (
                        <Card cards={card} key={card.title}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;