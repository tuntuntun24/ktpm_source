import styles from "./DisplayUserSearch.module.css"
import { UserSelectedContext } from "../../../pages/Chat/Chat"
import { useContext } from "react"


function DisplayUserSearch(props) {

    let setUserSelected = useContext(UserSelectedContext).setUserSelected

    let avatar = props.displayData.avartar
    let nickName = props.displayData.nickName

    let avatarStyles = {
        backgroundImage: `url(${avatar})`,
        height: "60px",
        width: "60px",
        borderRadius: "50%",
        cursor: "pointer",
        backgroundSize: "contain"
    }

    function handleClickUserFound() {
        setUserSelected(props.displayData)
    }

    return (
        <>
            <div className={styles.display_container} onClick={handleClickUserFound} >
                <div className={styles.avatar} style={avatarStyles}>

                </div>
                <span className={styles.nickName}>
                    {nickName}
                </span>
            </div>
        </>
    )

}


export default DisplayUserSearch
