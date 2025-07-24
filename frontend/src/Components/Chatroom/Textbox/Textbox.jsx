function Textbox(props) {
    const currentTime = now.toLocaleTimeString();

    return (
        <div className={styles.box}>
            <h4>{currentTime}</h4>
            <h3>{props.messages}</h3>
        </div>
    )
}

export default Textbox;