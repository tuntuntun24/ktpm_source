import axios from "axios"
import { useEffect } from "react";

function PaymentSuccess() {
    let transId = localStorage.getItem("transId");

    useEffect(async () => {
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/checkPayMent", { transId }, { withCredentials: true })
            window.location.href = "/payMent"
        } catch (error) {
            alert("Có lỗi trong quá trình xác nhận thanh toán!!!");
            window.location.href = "/payMent"
        }
    })

}

export default PaymentSuccess
