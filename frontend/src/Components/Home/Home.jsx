import { NavLink } from "react-router";
import { useState } from "react";
import styles from './Home.module.css'

function Home () {
    const [username, setUsername] = useState('');
    const [Passcode, setPasscode] = useState('');

    const handleUser = (e) => {
        setUsername(e.target.value);
    }

    const handlePass = (e) => {
        setPasscode(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form submitted");
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
                        type="text"
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