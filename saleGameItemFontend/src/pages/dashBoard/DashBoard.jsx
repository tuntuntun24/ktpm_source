import React, { useState } from 'react';
import style from './DashBoard.module.css';
import NavbarDashboard from '../../components/Navbardashboard/Navbar.dashboard';
import Footer from '../../components/Footer/Footer';
import lol from '../../assets/lol2.mp4';
import HeaderDashboard from '../../components/HeaderDashboard/Header.dashboard';

const Dashboard = () => {
    const [hide, setHide] = useState(false);

    function handleClickMenuIcon(hide) {
        setHide(preHide => !preHide);
    };

    return (
        <div className={style["dashboard_container"]}>
            <video autoPlay muted loop src={lol} className={style["video"]}>
                Trình duyệt của bạn không hỗ trợ video.
            </video>
            <HeaderDashboard handleClickMenuIcon={handleClickMenuIcon} title={"DASHBOARD"} />
            <div className={style["nav"]} style={{ left: hide ? '-20%' : '0px' }}>
                <NavbarDashboard />
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;