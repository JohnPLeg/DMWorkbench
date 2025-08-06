import styles from '../Login.module.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../Navigation/Navigation';

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredential) => {
                console.log(userCredential.user);
                navigate('/stat-block-home');
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    const handleEmail = (e) => {
        setForm(prev => ({
            ...prev,
            email: e.target.value
        }))
    }

    const handlePass = (e) => {
        setForm(prev => ({
            ...prev,
            password: e.target.value
        }))
    }


    return (
        <>
            <Navigation/>
            <div className={styles.loginContainer}>
                <form id='registerForm' className={styles.box} onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <input type="email" placeholder='Email' onChange={handleEmail}/>
                    <input type="password" placeholder='Password' onChange={handlePass}/>
                    <button type='submit' form='registerForm' className={styles.submit}>Register</button>
                </form>
            </div>
        </>
    )
}

export default Register;