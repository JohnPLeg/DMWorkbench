import { UserContext } from "../../Context/UserContext";
import { useState, useContext } from "react";
import styles from './Home.module.css'

function Home () {
    const { user, setUser } = useContext(UserContext);
    const [passcode, setPasscode] = useState('');
    const [result, setResult] = useState(false);
    const axios = require('axios').defaults;

    const handleUser = (e) => {
        setUser(e.target.value);
    }

    const handlePass = (e) => {
        setPasscode(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('/user', {
            params: {
                user: user,
                password: passcode
            }
        })
        .then(response => {
            setResult(response);
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