import React, { useEffect, useState, useRef } from 'react';
import style from './Footer.module.css';

function Footer() {
    return (
        <>
            <div className={style["footer-container"]}>
                <div className={style["decoration-box1"]}></div>
                <div className={style["decoration-box2"]}></div>
            </div>
        </>
    )
}

export default Footer;