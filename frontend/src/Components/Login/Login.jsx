import Navigation from '../Navigation/Navigation';
import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail } from '../../firebase/auth';
import { auth } from '../../firebase';



function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await loginWithEmail(form.email, form.password);
            navigate('/stat-block-home');
        } catch (error) {
            console.log(error);
        }
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

    const handleClick = () => {
        navigate('/login/register');
    }

    return (
        <>
            <Navigation/>
            <div className={styles.loginContainer}>
                <form id='loginForm' className={styles.box} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input type="email" placeholder='Email' onChange={handleEmail}/>
                    <input type="password" placeholder='Password' onChange={handlePass}/>
                    <button type='submit' form='loginForm' className={styles.submit}>Sign In</button>
                </form>
            </div>
            <p className={styles.regBtn} onClick={handleClick}>Register</p>
        </>
    )
}

export default Login;