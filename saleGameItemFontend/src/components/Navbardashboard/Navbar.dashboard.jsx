import React, { useEffect, useState } from "react";
import style from './Navbar.dashboard.module.css'
import { useNavigate } from "react-router-dom";

function NavbarDashboard() {
    let navigate = useNavigate()

    let arrayPages = [
        { name: "Trang chủ", path: "/dashBoard" },
        { name: "Tài khoản của tôi", path: "/myAccount" },
        { name: "Kho đồ của tôi", path: "/myInventories" },
        { name: "Chợ", path: "/products" },
        { name: "Nạp tiền", path: "/payMent" },
        { name: "Thống kê giao dịch", path: "/statisticsTransaction" },
        { name: "Quay đồ", path: "/gacha" },
        { name: "Đoạn chat", path: "/messages" },
    ]

    const styleLiSelected = {
        padding: '10px 20px',
        width: '70%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'greenyellow',
        borderRadius: "20px"
    };

    const handleClick = (e) => {
        navigate(e.path)
    };

    const htmlContent = arrayPages.map((e) => {
        return (
            <li
                key={e.name}
                style={e.path == location.pathname ? styleLiSelected : {}}
                onClick={() => handleClick(e)}
            >
                <p>{e.name}</p>
            </li>
        );
    });


    return (
        <div id={style["nav-container"]}>
            <p className={style["menu-Title"]}>MENU</p>
            <ul className={style["nav-vertical"]}>
                {htmlContent}
            </ul>
        </div>
    )
}

export default NavbarDashboard