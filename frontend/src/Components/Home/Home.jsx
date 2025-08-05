import { cardInfo } from "../../Data/cardInfo";
import Navigation from "../Navigation/Navigation";
import Card from "./Card/Card";
import styles from './Home.module.css'

function Home () {
    return (
        <div className={styles.gradient}>
            <div className={styles.bannerContainer}>
                <Navigation/>
                <h1 className={styles.banner}>DMWorkbench</h1>
                <h3>A passion project by John Legge</h3>
                <h2 className={styles.scrollButton} onClick={() => {window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" })}}>Begin</h2>
                <p className={styles.downArrow}>↓</p>
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