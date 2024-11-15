import { useEffect, useState } from "react"
import styles from "./MyInventories.module.css"
import axios from "axios"
import HeaderDashboard from "../../components/HeaderDashboard/Header.dashboard.jsx"
import NavbarDashboard from "../../components/Navbardashboard/Navbar.dashboard"
import ShowListInventories from "../../components/ShowListInventories/ShowListInventories.jsx"
import LinkAccount from "../../components/LinkAccountForm/LinkAccount.jsx"
function MyInventories() {

    let userData = JSON.parse(localStorage.getItem("userData"))
    let [myInventoriesData, setMyInventoriesData] = useState([])
    let options = ["Tất cả", "Vật phẩm", "Tướng", "Trợ thủ", "Đồ đang bán của tôi"]
    let [optionSelected, setOptionSelected] = useState(options[0])
    let [notication, setNotication] = useState("Đang tải dữ liệu kho đồ vui lòng đợi!")
    let displayData = []

    const styleOptionSelected = {
        color: 'greenyellow',
    };

    function handleClickOptionNav(e, option) {
        setOptionSelected(option)
    }

    switch (optionSelected) {
        case options[0]:
            displayData = myInventoriesData
            break;
        case options[1]:
            displayData = myInventoriesData.filter((e) => {
                return e.itemType == 1
            })
            break;
        case options[2]:
            displayData = myInventoriesData.filter((e) => {
                return e.itemType == 2
            })
            break;
        case options[3]:
            displayData = myInventoriesData.filter((e) => {
                return e.itemType == 3
            })
            break;
        case options[4]:
            displayData = myInventoriesData.filter((e) => {
                return e.price > 0
            })
            break;

        default:
            break;
    }


    let optionNav = <nav className={styles.navbar}>
        {options.map((option, index) => (
            <div key={index} onClick={(e) => { handleClickOptionNav(e, option) }} className={styles.navItem} style={option == optionSelected ? styleOptionSelected : {}} >
                {option}
            </div>
        ))}
    </nav>


    useEffect(() => {
        const fetchData = async () => {
            try {
                let responseInventories = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/getInventories", {}, { withCredentials: true })
                setMyInventoriesData(JSON.parse(responseInventories.data.dataInventories).sort((a, b) => { return a.price - b.price }))
            } catch (error) {
                console.log(error);
                alert(error.response.data.message);
                setNotication("Tải kho đồ thất bại!")
            }
        }

        fetchData()
    }, [])


    return (
        <>
            <div className={styles.wrapper} >
                <div className={styles.nav_wrapper}>
                    <NavbarDashboard />
                </div>
                <div className={styles.content_wrapper} >
                    {userData?.gameId <= 0 ? <LinkAccount />
                        : !myInventoriesData.length
                            ? <h1>{notication}</h1> :
                            <>
                                {optionNav}
                                <ShowListInventories displayData={displayData} /></>}
                </div>
            </div>

        </>
    )


}


export default MyInventories