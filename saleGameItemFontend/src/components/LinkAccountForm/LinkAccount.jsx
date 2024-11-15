import React from 'react';
import styles from './LinkAccount.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const LinkAccount = () => {

    const [base64Captcha, setBase64Captcha] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [userNameGame, setUserNameGame] = useState("")
    const [passWordGame, setPassWordGame] = useState("")

    useEffect(() => {
        fetchCaptcha();
    }, []);

    const fetchCaptcha = async (event) => {
        // event.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/getNewCaptcha`, {}, { withCredentials: true });
            localStorage.setItem("keyCaptcha", response.data.key)
            setBase64Captcha(response.data.base64);
        } catch (err) {
            console.error(`Error when loading captcha: ${err}`);
        }
    };

    function handleChangeUserNameGame(e) {
        setUserNameGame(e.target.value)
    }

    function handleChangePassWordGame(e) {
        setPassWordGame(e.target.value)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            let key = localStorage.getItem("keyCaptcha")
            let responseLinkAccount = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/linkAccount", { userNameGame, passWordGame, text: captcha, key }, { withCredentials: true })
            window.location.href = "/myInventories"

        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/getNewCaptcha`, {}, { withCredentials: true });
            localStorage.setItem("keyCaptcha", response.data.key)
            setBase64Captcha(response.data.base64);
        }

    }





    return (
        < >
            <div className={styles.wrapper}>
                <div className={styles.logoGarena} >  </div>
                <h1 style={{ color: "greenyellow", textAlign: "center" }} >Bạn chưa liên kết tài khoản game</h1>

                <div className={styles.container}>
                    <h1 style={{ textAlign: "center", color: "red" }} >Form liên kết tài khoản</h1>
                    <div className={styles.form}>
                        <div className={styles.inputGroup}>
                            <input value={userNameGame} onChange={handleChangeUserNameGame} type="text" id="username" name="username" placeholder='Nhập tài khoản game' required className={styles["input-field"]} />
                        </div>

                        <div className={styles.inputGroup}>
                            <input value={passWordGame} onChange={handleChangePassWordGame} type="password" id="password" name="password" placeholder='Nhập mật khẩu game' required className={styles["input-field"]} />
                        </div>

                        <div className={styles["captcha-container"]}>
                            <input
                                type="text"
                                className={styles["input-field"]}
                                value={captcha}
                                placeholder="Nhập captcha"
                                onChange={(e) => setCaptcha(e.target.value)}
                            />
                            <img className={styles["captcha-img"]} src={base64Captcha} alt="Captcha" />
                            <button className={styles["captcha-btn"]} onClick={fetchCaptcha}></button>
                        </div>
                        <button type="submit" className={styles.submitButton} onClick={handleSubmit}>Liên kết</button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default LinkAccount;
