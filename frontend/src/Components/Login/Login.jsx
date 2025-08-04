import Navigation from '../Navigation/Navigation';
import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';



function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = () => {
        signInWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredential) => {
                console.log(userCredential.user);
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

    const handleClick = () => {
        navigate('/login/register');
    }

    return (
        <>
            <Navigation/>
            <div className={styles.container}>
                <form id='loginForm' className={styles.box} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input type="email" placeholder='Email' onChange={handleEmail}/>
                    <input type="password" placeholder='Password' onChange={handlePass}/>
                    <button type='submit' form='loginForm'>Sign In</button>
                </form>
            </div>
            <p onClick={handleClick}>Register</p>
        </>
    )
}

export default Login;