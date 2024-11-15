import { useState } from "react";
import styles from "./SearchUser.module.css"

import { FaSearch } from "react-icons/fa";
import axios from "axios";
import DisplayUserSearch from "./DisplayUserSearch/DisplayUserSearch";

import ChatWorld from "../ChatWorld/ChatWorld.jsx"

function SearchUser() {

    let [userFounds, setUserFounds] = useState([])
    let [nickName, setNickName] = useState('')

    async function handleClickSearch() {
        try {
            let responseSearchUser = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/searchUserByNickName", { nickName }, { withCredentials: true })
            let accountFounds = responseSearchUser.data.accountFounds;
            if (!accountFounds?.length) {
                alert("Không tìm thấy tài khoản hợp lệ!")
                return
            }
            setUserFounds(accountFounds)
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }

    function handOnchangeNickName(e) {
        setNickName(e.target.value)
    }

    return (
        <>
            <div className={styles.search_container} >
                <div className={styles.search_box}>
                    <input type="text" className={styles.search_input} placeholder="Nhập nick name cần tìm..." value={nickName} onChange={handOnchangeNickName} />
                    <FaSearch className={styles.search_icon} onClick={handleClickSearch} />
                </div>
                {
                    !userFounds?.length ? <div />
                        :
                        userFounds.map((e, i) => {
                            return <DisplayUserSearch key={i} displayData={e} />
                        })
                }
                <ChatWorld />
            </div>
        </>
    )

}


export default SearchUser

