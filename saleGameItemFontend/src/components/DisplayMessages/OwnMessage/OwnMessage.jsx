import styles from "./OwnMessage.module.css"


function OwnMessage(props) {

    let inforMessage = props.inforMessage

    return (
        <div className={styles.ownMessage_container}>
            <span className={styles.messageContent} >{inforMessage.messageContent}</span>
            <span style={{ fontSize: "10px" }} >{props.inforMessage.timestamp}</span>
        </div>
    )

}

export default OwnMessage