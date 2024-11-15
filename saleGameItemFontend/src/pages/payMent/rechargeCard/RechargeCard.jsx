import React, { useState } from 'react';
import styles from './RechargeCard.module.css';
import axios from 'axios';

import NavbarDashboard from '../../../components/Navbardashboard/Navbar.dashboard';

const RechargeCard = () => {

    let userData = JSON.parse(localStorage.getItem("userData"))

    let { nickName, userName, balance } = userData


    const [selectedAmount, setSelectedAmount] = useState(null);

    const amounts = [10000, 20000, 50000, 100000, 200000];

    const handleSelect = (amount) => {
        setSelectedAmount(amount);
    };

    const handleSubmit = async () => {
        let dataPostCreatePaymentLink = {
            amount: selectedAmount,
            description: " amount : " + selectedAmount
        }
        try {
            let data = await axios.post(import.meta.env.VITE_BACKEND_URL + '/auth/createPaymentLink', dataPostCreatePaymentLink, { withCredentials: true })

            data = data.data.dataFromCreatePaymentLink

            if (data.data?.checkoutUrl) {
                localStorage.setItem("transId", data.data?.paymentLinkId)
                window.location.href = data.data?.checkoutUrl
            } else {
                alert("khởi tạo giao dịch chưa thành công! thử lại.")
            }
            return

        } catch (error) {
            alert("khởi tạo giao dịch chưa thành công! thử lại.")
            console.log(error);

        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.nav_wrapper}>
                <NavbarDashboard />
            </div>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h2 className={styles.nickname}>xin chào , {nickName}</h2>
                    <p className={styles.username} style={{ color: "white", fontSize: "20px" }}>Tài khoản: {userName}</p>
                    <p className={styles.balance} style={{ color: "#FFFF00", fontSize: "20px" }}>Số dư: {balance} xu</p>
                </div>

                <div className={styles.content}>
                    <p style={{ color: "black", fontSize: "20px", margin: "20px", fontWeight: "bold" }} >Chọn mệnh giá thẻ nạp:</p>
                    <div className={styles.amountOptions}>
                        {amounts.map((amount) => (
                            <div
                                key={amount}
                                className={`${styles.amount} ${selectedAmount === amount ? styles.selected : ''}`}
                                onClick={() => handleSelect(amount)}
                            >
                                {amount.toLocaleString()} VND
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className={styles.confirmButton}
                    onClick={handleSubmit}
                    disabled={!selectedAmount}
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
};

export default RechargeCard;
