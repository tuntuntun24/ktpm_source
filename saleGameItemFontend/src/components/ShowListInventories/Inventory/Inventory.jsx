import styles from "./Inventory.module.css"




function Inventory(props) {
    let inventoryData = props?.inventoryData || {
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjwQ0nezaY4Db_kRm5rYrptD2_AYf93ZI5g7CD5nIo0_xhRd_VKsOc9hCp5k0UD4FEXtkFG1UuqvfBffWg_gMjQ4nvyu3gib_8S34FmPecqQ7Cj8MJl5oEta2QKkjpicoC49d3wYueMW42Rg-FcWAXgj_Zs5MuqA5ZDDqJVIgmjCYv6nlI53yIwdAM-DWdD/w320-h320/pandora's-box-png.png",
        description: "none",
        name: "none",
        price: 0,
        itemType: 1,
    }
    let handleClick = props.handleClick

    let styleCommon = {
        backgroundColor: "black",
        backgroundImage: `url(${inventoryData.image})`,
        backgroundRepeat: "no-repeat",
        borderRadius: "10px",
        backgroundSize: "contain",
        height: "150px",
        width: "150px",
        margin: "20px"
    }

    let styleType1 = {
        ...styleCommon,
        borderRadius: "50%"
    }

    let styleType2 = {
        ...styleCommon,
        height: "200px",
        width: "170px",
        backgroundColor: "yellow",
    }

    let styleType3 = {
        ...styleCommon,
        backgroundColor: "white",
        height: "200px",
        width: "170px",
    }

    let appliedStyle;

    switch (inventoryData.itemType) {
        case 1:
            appliedStyle = styleType1;
            break;
        case 2:
            appliedStyle = styleType2;
            break;
        case 3:
            appliedStyle = styleType3;
            break;
        default:
            appliedStyle = styleCommon;
    }

    return (
        <>

            <div className={styles.wrapper_inventory} onClick={(e) => { handleClick(e, inventoryData) }} >
                <div style={appliedStyle}></div>
                <span style={{ color: "greenyellow" }} >{inventoryData.name}  </span>
            </div>
        </>
    )


}



export default Inventory
