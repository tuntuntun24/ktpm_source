import styles from "./ListUserChat.module.css";
import { useNavigate } from "react-router-dom";

import UserChatted from "./UserChatted/UserChatted";



function ListUserChat({ listUserChatted }) {
    let navigate = useNavigate();
    let listUser = listUserChatted || []

    return (
        <div className={styles.listUserChat_container}>

            <div
                className={styles.btn_ReturnDashBoard}
                onClick={() => { navigate("/dashBoard"); }}
            >
                <span>Back to Dashboard</span>
            </div>

            <h2>Danh sách người từng nhắn :</h2>


            <div className={styles.userList}>
                {
                    listUser.map((e, i) => {
                        return <UserChatted key={i} userChattedData={e} />
                    })
                }

            </div>
        </div>
    );
}

export default ListUserChat;
