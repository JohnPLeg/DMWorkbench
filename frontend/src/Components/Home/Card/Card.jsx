import styles from './Card.module.css'
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth'

function Card(props) {
    const auth = getAuth();
    let navigate = useNavigate();

    return (
        <div className={styles.card} onClick={() => {navigate(`${props.cards.route}`)}}>
            <div className={styles.trim}>
                <img className={styles.blur} src={props.cards.image}/>
            </div>
            <h1>{props.cards.title}</h1>
            <p>{props.cards.description}</p>
        </div>
    )
}

export default Card;