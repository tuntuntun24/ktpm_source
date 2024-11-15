import styles from "./UserChatted.module.css"

import { UserSelectedContext } from "../../../pages/Chat/Chat";
import { useContext } from "react";

function UserChatted({ userChattedData }) {

    let setUserSelected = useContext(UserSelectedContext).setUserSelected

    let userSelected = useContext(UserSelectedContext).userSelected

    let styleUserSelected = {
        backgroundColor: "rgb(108, 127, 179)"
    }

    function handleOnclickSelectUser() {
        let selected = { nickName: userChattedData.nickName, avartar: userChattedData.avatar, userId: userChattedData.userId }
        setUserSelected(selected)
    }

    return (
        <div className={styles.userChattedContainer} onClick={handleOnclickSelectUser} style={userSelected.userId == userChattedData.userId ? styleUserSelected : {}} >
            <div className={styles.avatar} style={{ backgroundImage: `url(${userChattedData.avatar})` }}></div>
            <div className={styles.userInfo}>
                <span className={styles.nickName}>{userChattedData.nickName}</span>
                <span className={styles.userId} style={{ color: "black" }}>User ID: {userChattedData.userId}</span>
            </div>
        </div>
    );
}

export default UserChatted;
