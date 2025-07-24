import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
import { fakeMessages } from "../../../../backend/fakeMessages";
import Textbox from "./Textbox/Textbox";

function Chatroom() {
    const { user, setUser } = useContext(UserContext);

    return (
        <>
            <div className={styles.container}>
                {fakeMessages.map((message, index) => (
                    <Textbox key={index} messages={message}/>
                ))}
            </div>
            <div className={styles.textInput}>

            </div>
        </>
    )
}

export default Chatroom;