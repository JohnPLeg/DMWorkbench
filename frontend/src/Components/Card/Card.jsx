import styles from './Card.module.css'

function Card(props) {
    return (
        <div>
            <div className={styles.trim}><img className={styles.blur} src={props.cards.image}/></div>
            <h1>{props.cards.title}</h1>
            <p>{props.cards.description}</p>
        </div>
    )
}

export default Card;