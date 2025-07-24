import { UserContext } from "../../Context/UserContext";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
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
        
        axios.post('http://localhost:3000/user', {
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
        <div className={styles.container}>
            <div className={styles.box}>
                <form onSubmit={handleSubmit}>
                    <h3 className={styles.userInput}>Username</h3>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        className={styles.input}
                        onChange={handleUser}
                    />
                    <h3 className={styles.userInput}>Passcode</h3>
                    <input
                        type="password"
                        placeholder="Passcode"
                        className={styles.input}
                        onChange={handlePass}
                    />
                    <button className={styles.button} type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default Home;