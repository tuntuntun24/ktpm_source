import React, { useState, useEffect } from 'react';
import style from './MyAccount.module.css';
import NavbarDashboard from '../../components/Navbardashboard/Navbar.dashboard';
import HeaderDashboard from '../../components/HeaderDashboard/Header.dashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
    let userData = JSON.parse(localStorage.getItem("userData"))
    // console.log(userData);

    const [hide, setHide] = useState(false);
    let [oldPassWord, setOldPassword] = useState("")
    let [newPassWord, setNewPassword] = useState("")
    let [newNickName, setNewNickName] = useState("")
    let navigate = useNavigate()

    function handleClickMenuIcon(hide) {
        setHide(preHide => !preHide);
    };

    useEffect(() => {
        const workplace = document.getElementsByClassName(style.input)[0];
        if (workplace) {
            setTimeout(() => {
                workplace.style.opacity = '1';
            }, 500)
        }
    }, [])

    function handleOnchangeNickName(e) {
        setNewNickName(e.target.value)
    }

    function handleOnchangeOldPassWord(e) {
        setOldPassword(e.target.value)
    }

    function handleOnchangeNewPassWord(e) {
        setNewPassword(e.target.value)
    }


    async function handleClickUpdateNickName() {
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/changeNickName", { newNickName }, { withCredentials: true })
            window.location.href = "/myAccount"
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }

    }

    async function handleChangePassWord() {
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/changePassWord", { oldPassWord, newPassWord }, { withCredentials: true })
            alert("Đổi mật khẩu thành công!");
            setOldPassword('')
            setNewPassword('')
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }

    async function handleOnUnLinkAccount() {
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/unLinkAccount", {}, { withCredentials: true })
            window.location.reload();
        }
        catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }

    return (
        <>
            <div className={style["account-container"]}>
                {/* nickname, avatar, tài khoản, đổi mk, un link acc, số dư */}
                <HeaderDashboard handleClickMenuIcon={handleClickMenuIcon} title={"ACCOUNT"} />
                <div className={style["nav"]} style={{ left: hide ? '-20%' : '0px' }}>
                    <NavbarDashboard />
                </div>
                <div className={style["workplace"]}>
                    <div className={style["status-container"]}>
                        <div className={style["account-status"]}>
                            <div className={style["input"]}>
                                <div className={style["other-container"]}>
                                    <p>Đổi mật khẩu <a>*</a></p>
                                    <input type="text" placeholder='Nhập mật khẩu cũ' value={oldPassWord} onChange={handleOnchangeOldPassWord} />
                                    <input type="text" placeholder='Nhập mật khẩu mới' value={newPassWord} onChange={handleOnchangeNewPassWord} />
                                    <p
                                        style={{ marginBottom: '20px', fontFamily: "Roboto" }}
                                    >Số Dư: {userData.balance} xu</p>
                                    <div className={style["btn-container"]}>
                                        <button className={style['save']} onClick={handleChangePassWord} >Xác nhận</button>
                                        <button className={style['link']}
                                            style={userData.gameId > 0 ? { display: 'none' } : { display: 'block' }}
                                            onClick={() => { navigate('/myInventories') }}
                                        >Liên kết tài khoản game</button>
                                    </div>
                                </div>

                                <div className={style["nickname-container"]}>
                                    <p>NickName <a>*</a></p>
                                    <input type="text" placeholder='Nhập nickname mới' value={newNickName} onChange={handleOnchangeNickName} />
                                    <button className={style['update-nickname']} onClick={handleClickUpdateNickName}  >Cập nhật</button>
                                </div>

                                <div className={style["account-infor"]}
                                    style={userData.gameId > 0 ? { display: 'block' } : { display: 'none' }}
                                >
                                    <p>Tài khoản liên kết: {userData.userNameGame}</p>
                                    <button onClick={handleOnUnLinkAccount}>Hủy liên kết</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MyAccount;