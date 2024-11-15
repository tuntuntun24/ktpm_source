import React, { useEffect } from "react";
import style from "./AllUserSellingItem.module.css"

function AllUserSellingItem() {
    const selectedUserId = localStorage.getItem('selectedUserId')
    // console.log(selectedUserId);
    const listSaleItemsData = JSON.parse(localStorage.getItem('listSaleItemsData'))
    let data = listSaleItemsData.filter((e) => { return e.userId == selectedUserId })
    console.log(data);

    return (
        <>
            <div className={style["product-container"]}>
                <div className={style["one-item"]}>
                    <div className={style["item-img"]}
                        style={{ backgroundImage: `url('${data.image}')` }}
                    ></div>
                </div>
                <div className={style["all-item"]}></div>
            </div>
        </>
    )
}

export default AllUserSellingItem;