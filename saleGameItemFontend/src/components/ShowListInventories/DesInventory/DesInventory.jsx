import { useState } from "react";
import styles from "./DesInventory.module.css"
import axios from "axios";

function DesInventory(props) {
    let inventoryData = props?.inventoryData || {
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjwQ0nezaY4Db_kRm5rYrptD2_AYf93ZI5g7CD5nIo0_xhRd_VKsOc9hCp5k0UD4FEXtkFG1UuqvfBffWg_gMjQ4nvyu3gib_8S34FmPecqQ7Cj8MJl5oEta2QKkjpicoC49d3wYueMW42Rg-FcWAXgj_Zs5MuqA5ZDDqJVIgmjCYv6nlI53yIwdAM-DWdD/w320-h320/pandora's-box-png.png",
        description: "none",
        name: "none",
        price: 0,
        itemType: 1,
    };



    let { image, description, price, itemType, name, itemId } = inventoryData;

    let [addPrice, setAddPrice] = useState()

    let height
    switch (itemType) {
        case 1:
            height = "170px"
            break;
        case 2:
            height = "300px"
            break;
        default:
            height = '250px'
            break;
    }

    async function handleClickAddItemSalling() {
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/addItemSalling", { itemId, price: addPrice }, { withCredentials: true })
            alert("Đăng bán thành công!")
            window.location.reload()
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }

    async function handleClickDropItem() {
        const isConfirmed = window.confirm("Bạn có chắc muốn đổi item này lấy 100 xu?");
        if (!isConfirmed) {
            return
        }
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/dropItem", { itemId }, { withCredentials: true })
            alert("Đổi thành công!")
            window.location.reload()
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }

    function handleChangeAddPrice(e) {
        setAddPrice(e.target.value)
    }

    const backgroundStyle = {
        width: '100%',
        height,
        backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
    };

    return (
        <>
            <div className={styles.desWrapper}>
                <h1 style={{ color: "yellow", textAlign: "center" }} >Mô tả</h1>
                <div className={styles.imageInventory} style={{ ...backgroundStyle, margin: "20px" }}>
                </div>
                <span style={{ color: "greenyellow", fontSize: "25px", margin: "15px" }}><span style={{ color: "red", fontSize: "27px" }}>Giá bạn đang bán : </span>  {price ? price + " xu" : "Sản phẩm này chưa được bạn bán"}</span>

                <span style={{ color: "greenyellow", fontSize: "25px", margin: "15px" }} ><span style={{ color: "red", fontSize: "27px" }}>Tên : </span> {name} </span>

                <span className={styles.desText} style={{ height: "100px" }}>
                    <span style={{ color: "red", fontSize: "27px", }}>Thông tin chi tiết : </span>
                    {description}
                </span>
                <button className={styles.drop_item} onClick={handleClickDropItem}>Đổi đồ này lấy 100 xu?</button>
                {
                    price ? <div />
                        : <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <input value={addPrice} type="number" placeholder="Nhập giá nếu muốn bán..." className={styles.price_input} onChange={handleChangeAddPrice} />
                            <button onClick={handleClickAddItemSalling} className={styles.buy_btn} >Bán</button>
                        </div>
                }

            </div>
        </>
    )

}


export default DesInventory
