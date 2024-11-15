import React, { useEffect, useState } from "react";
import style from './Register.module.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [base64Captcha, setBase64Captcha] = useState('');
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [rePassWord, setRePassWord] = useState('');
    const [nickName, setNickName] = useState('');
    const [captcha, setCaptcha] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCaptcha();
    }, []);

    const fetchCaptcha = async () => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/getNewCaptcha",
                {},
                { withCredentials: true }
            );
            localStorage.setItem("keyCaptcha", response.data.key)
            setBase64Captcha(response.data.base64);
        } catch (err) {
            console.error(`Error when loading captcha: ${err}`);
            alert(err.response.data.message);
        }
    };

    const handleRegister = async () => {
        try {
            let key = localStorage.getItem("keyCaptcha")
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/register",
                { userName, passWord, rePassWord, nickName, text: captcha, key },
                { withCredentials: true }
            );
            console.log(response.data);
            navigate("/login");
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/getNewCaptcha`, {}, { withCredentials: true });
            localStorage.setItem("keyCaptcha", response.data.key)
            setBase64Captcha(response.data.base64);
        }
    };

    return (
        <>
            {base64Captcha ? (
                <div className={style.container}>
                    <div className={style.form}>
                        <div className={style.logo}></div>
                        <h2 className={style.title}>ĐĂNG KÝ TÀI KHOẢN</h2>

                        <input
                            type="text"
                            placeholder="Nhập tài khoản"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={passWord}
                            onChange={(e) => setPassWord(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={rePassWord}
                            onChange={(e) => setRePassWord(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập nickname"
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                        />

                        <div className={style.captchaSection}>
                            <input
                                type="text"
                                placeholder="Nhập captcha"
                                value={captcha}
                                onChange={(e) => setCaptcha(e.target.value)}
                            />
                            <img src={base64Captcha} alt="captcha" />
                            <button onClick={fetchCaptcha} />
                        </div>

                        <button className={style.registerBtn} onClick={handleRegister}>
                            Đăng Ký
                        </button>

                        <p>
                            Đã có tài khoản?{" "}
                            <Link to="/login">Đăng nhập tại đây</Link>
                        </p>
                    </div>
                </div>
            ) : (
                <div className={style.loading}>
                    <h1>Đang tải captcha...</h1>
                </div>
            )}
        </>
    );
}

export default Register;
