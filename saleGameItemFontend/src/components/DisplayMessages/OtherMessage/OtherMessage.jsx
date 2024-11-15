import styles from "./OtherMessage.module.css"

function OtherMessage(props) {

    let inforMessage = props.inforMessage

    return (
        <div className={styles.otherMessage_container}>
            <div className={styles.avatar_message} style={{ backgroundImage: `url(${inforMessage.avatar})` }} />
            <span className={styles.messageContent} >{inforMessage.messageContent}</span>
        </div>
    )
}



export default OtherMessage