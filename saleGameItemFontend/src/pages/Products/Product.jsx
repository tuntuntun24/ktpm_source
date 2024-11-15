import { React, useEffect, useState } from "react";
import style from './Product.module.css';
import NavbarDashboard from "../../components/Navbardashboard/Navbar.dashboard";
import HeaderDashboard from "../../components/HeaderDashboard/Header.dashboard";
import ItemList from "../../components/ItemList/ItemList";
import axios from "axios";

function Products() {
    const [hide, setHide] = useState(false);
    const [typeOfItemList, setTypeOfItemList] = useState([])
    const option = ['Tất cả sản phẩm', 'Vật phẩm', 'Tướng', 'Trợ thủ', 'Sản phẩm của tôi']
    const [optionType, setOptionType] = useState(option[0])
    const userData = JSON.parse(localStorage.getItem('userData'))
    let displayData = []
    let isThisUser = false

    console.log(userData.userId);

    function handleClickMenuIcon(hide) {
        setHide(preHide => !preHide);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let responseProducts = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/getSalingItemList", {}, { withCredentials: true })
                // console.log(responseProducts.data.salingItemListData);
                setTypeOfItemList(responseProducts.data.salingItemListData);
            }
            catch (error) {
                console.log(error);
                alert(error.response.data.message);
                setNotication("Tải sản phẩm thất bại!")
            }
        }

        fetchData()
    }, [])

    switch (optionType) {
        case option[0]:
            isThisUser = false
            displayData = typeOfItemList.filter((e) => { return e.userId != userData.userId });
            break;
        case option[1]:
            isThisUser = false
            displayData = typeOfItemList.filter((e) => { return e.itemType === 1 && e.userId != userData.userId });
            break;
        case option[2]:
            isThisUser = false
            displayData = typeOfItemList.filter((e) => { return e.itemType === 2 && e.userId != userData.userId });
            break;
        case option[3]:
            isThisUser = false
            displayData = typeOfItemList.filter((e) => { return e.itemType === 3 && e.userId != userData.userId });
            console.log(displayData);
            break;
        case option[4]:
            isThisUser = true
            displayData = typeOfItemList.filter((e) => { return e.price > 0 && e.userId === userData.userId });
            break;
        default:
            displayData = typeOfItemList;
            break;
    }


    return (
        <div className={style['product-container']}>
            <HeaderDashboard handleClickMenuIcon={handleClickMenuIcon} title={"DASHBOARD"} />
            <div className={style["nav"]} style={{ left: hide ? '-20%' : '0px', }}            >
                <NavbarDashboard />
            </div>
            <div className={style["workplace"]}>
                <div className={style["product-nav"]}>
                    <ul>
                        <li onClick={() => { setOptionType(option[0]) }} style={optionType == option[0] ? { backgroundColor: 'brown' } : { backgroundColor: '#000000' }}>
                            <p>Tất cả sản phẩm</p>
                        </li>
                        <li onClick={() => setOptionType(option[1])} style={optionType == option[1] ? { backgroundColor: 'brown' } : { backgroundColor: '#000000' }}>
                            <p>Vật phẩm</p>
                        </li>
                        <li onClick={() => setOptionType(option[2])} style={optionType == option[2] ? { backgroundColor: 'brown' } : { backgroundColor: '#000000' }}>
                            <p>Tướng</p>
                        </li>
                        <li onClick={() => setOptionType(option[3])} style={optionType == option[3] ? { backgroundColor: 'brown' } : { backgroundColor: '#000000' }}>
                            <p>Trợ thủ</p>
                        </li>
                        <li onClick={() => setOptionType(option[4])} style={optionType == option[4] ? { backgroundColor: 'brown' } : { backgroundColor: '#000000' }}>
                            <p>Sản phẩm của tôi</p>
                        </li>
                    </ul>
                </div>
                <ItemList displayData={displayData} isThisUser={isThisUser} />
            </div>
        </div>
    )
}

export default Products;