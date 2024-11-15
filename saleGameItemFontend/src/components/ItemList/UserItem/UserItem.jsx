import React, { useState } from "react";
import style from "./UserItem.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserItem(props) {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const navigate = useNavigate()
    const [changePrice, setChangePrice] = useState(0)

    let dataItem = props?.dataItem || {
        itemId: 3,
        image: "https://lienquan.garena.vn/wp-content/uploads/2024/05/85bfb0396118e0b32f1e3f4b34911d235875f11c6208c1.png",
        name: "Charlotte",
        nickName: "Admin",
        desc: "Charlotte champion",
        price: "10$",
        avatarImg: "https://lienquan.garena.vn/wp-content/uploads/2024/05/Remove-bg.ai_1718860136853.png",
    }

    let { itemId, image, name, nickName, description, price, avatarImg } = dataItem

    const handleCancelSailing = async () => {
        try {
            let responseCancel = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/cancelSalling", { itemId }, { withCredentials: true })
            window.location.reload();
        }
        catch (error) {
            console.log(error);
            alert(error.response.data.message);
            setNotication("Tải sản phẩm thất bại!");
        }
    }

    const handleChangePrice = async () => {
        try {
            let responseCancel = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/changePrice", { itemId, changePrice }, { withCredentials: true })
            window.location.reload();
        }
        catch (error) {
            console.log(error);
            alert(error.response.data.message);
            setNotication("Tải sản phẩm thất bại!");
        }
    }

    console.log(changePrice);


    return (
        <>
            <div className={style['card']}>
                <div className={style["card-inner"]}>
                    <div className={style["item"]}>
                        <div className={style["item-img"]} style={{
                            backgroundImage: `url(${image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            width: "25%",
                            height: "35%",
                            transition: "1.5s",
                            cursor: "pointer",
                            position: 'absolute',
                            left: '120px',
                            top: '40px'
                        }}></div>
                        <p className={style['name']}>Tên sản phẩm: {name}</p>
                        <p className={style['price']}>Giá sản phẩm: <span
                            style={{ color: 'yellow', display: 'inline' }}
                        >{price} xu</span></p>
                        <p className={style['producer']}>Người bán: {nickName}</p>
                    </div >
                    <div className={style["back-side"]}>
                        <div className={style['desc']}>
                            <p>{description}</p>
                        </div>
                        <div className={style["change-price-container"]} onChange={e => setChangePrice(Number(e.target.value))}>
                            <input type="number" />
                            <button class={style["button-5"]} role="button" onClick={handleChangePrice}>Sửa giá</button>
                        </div>
                        <button class={style["button-58"]} role="button" onClick={handleCancelSailing}>Hủy bán</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserItem;