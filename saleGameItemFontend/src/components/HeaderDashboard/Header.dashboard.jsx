import style from './Header.dashboard.module.css'
import React, { useState } from 'react';
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

function HeaderDashboard({ handleClickMenuIcon, title }) {
    let navigate = useNavigate()
    let userData = JSON.parse(localStorage.getItem("userData"))
    let urlAvatar = userData.avartar
    let nickName = userData.nickName

    return (
        <>
            <div className={style["nav-horizional"]}>
                <div className={style.infor} id={style['nickname-container']}>
                    <div onClick={() => { navigate("/myAccount") }} style={{ backgroundImage: `url(${urlAvatar})` }} className={style.avartar} id={style['avatar']}> </div>
                    <span className={style['nickname']} > Xin chào : {nickName} <br /> <span>Số dư hiện tại : {userData.balance}</span> </span>
                </div>
                <HiOutlineSquares2X2 className={style['menu']} onClick={handleClickMenuIcon} />
                <p className={style['main-title']}>{title}</p>
                <div className={style["decoration"]}></div>
                <p className={style["web-name"]}>GAMMI<a className={style['last-letter']}>E</a></p>
                <button className={style["button-50"]} role="button" onClick={() => { navigate("/login") }} >ĐĂNG XUẤT</button>
            </div>
        </>
    )
}

export default HeaderDashboard;