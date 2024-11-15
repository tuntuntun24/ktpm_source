import { React, useRef, useState, useEffect } from "react";
import style from "./ItemList.module.css"
import Item from "./Item/Item";
import UserItem from "./UserItem/UserItem";
import axios from "axios";

function ItemList(props) {
    const [listItems, setListItems] = useState([]);
    const [showLeft, setShowLeft] = useState([true]);
    const [showRight, setShowRight] = useState([true]);
    const curIndex = useRef(0);
    let dataItems = listItems || []
    let htmlContent = dataItems.map((e, i) => {
        if (props.isThisUser) {
            return <UserItem dataItem={e} key={i} />
        }
        return <Item dataItem={e} key={i} />
    })

    const handleLeftClick = () => {
        try {
            curIndex.current -= 8;
            if (curIndex.current < -1) {
                setShowLeft(false);
            }
            else {
                setShowLeft(true)
            }
            if (curIndex.current > (props.displayData.length - 1)) {
                setShowRight(false)
            }
            else {
                setShowRight(true)
            }
            setListItems(props.displayData.slice(curIndex.current, curIndex.current + 8));
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleRightClick = () => {
        try {
            curIndex.current += 8;
            if (curIndex.current <= -1) {
                setShowLeft(false);
            }
            else {
                setShowLeft(true)
            }
            if (curIndex.current >= (props.displayData.length - 1)) {
                setShowRight(false)
            }
            else {
                setShowRight(true)
            }
            setListItems(props.displayData.slice(curIndex.current, curIndex.current + 8));
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setListItems(props.displayData.slice(0, 8)); // Bắt đầu với 8 mục đầu tiên
    }, [props.displayData]);

    return (
        <>
            <div className={style["item-list-container"]}>
                {htmlContent}
                <div className={style["btn-container"]} >
                    <button className={style["button-57"]} role="button" onClick={handleLeftClick}
                        style={{
                            display: showLeft ? "block" : "none"
                        }}
                    ><span className="text">&lt;</span><span>Trước</span></button>

                    <button className={style["button-57"]} role="button" onClick={handleRightClick}
                        style={{
                            display: showRight ? "block" : "none"
                        }}
                    ><span className="text">&gt;</span><span>Sau</span></button>
                </div>
            </div>
        </>
    )
}

export default ItemList;