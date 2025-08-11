import Navigation from '../Navigation/Navigation';
import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail } from '../../firebase/auth';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'



function Login() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await loginWithEmail(form.email, form.password);
            navigate('/stat-block-home');
        } catch (error) {
            alert("No user found with those credentials");
        } finally {
            setLoading(false);
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

    const handlePassReset = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("Password reset email sent!");
            alert("An email with to reset your password has been sent");
        })
        .catch((error) => {
            console.log(error);
        })
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
                    <p className={styles.forgotBtn} onClick={handlePassReset}>Forgot password?</p>
                    <button type='submit' form='loginForm' className={styles.submit} disabled={loading} style={loading ? { opacity: 0.5, pointerEvents: 'none' } : {}}>Sign In</button>
                </form>
            </div>
            <p className={styles.regBtn} onClick={handleClick}>Register</p>
        </>
    )
}

export default Login;