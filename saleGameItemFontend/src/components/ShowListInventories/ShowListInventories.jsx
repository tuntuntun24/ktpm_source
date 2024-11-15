import styles from "./ShowListInventories.module.css"
import { useState } from "react"

import Inventory from "./Inventory/Inventory"
import DesInventory from "./DesInventory/DesInventory"


function ShowListInventories(props) {


    let displayData = props?.displayData || []
    let [inventoryData, setInventoryData] = useState(displayData[0])

    function handleClick(e, data) {
        setInventoryData(data)
    }

    let htmlDisplayData = displayData.map((e, i) => {
        return <Inventory key={i} inventoryData={e} handleClick={handleClick} />
    })

    return (
        <>
            <div className={styles.wrapper_listInventories}>
                <div className={styles.listInventories}>
                    {htmlDisplayData}
                </div>
                <div className={styles.descriptionInventory} >
                    <DesInventory inventoryData={inventoryData} />
                </div>
            </div>

        </>
    )



}

export default ShowListInventories