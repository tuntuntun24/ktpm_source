import React, { useEffect, useRef, useState } from 'react';
import style from './Gacha.module.css';
import Item from '../../components/ItemList/Item/Item';

function Gacha() {
    const [dataGacha, setDataGacha] = useState([]);
    let data = JSON.parse(localStorage.getItem('listSaleItemsData')).slice(0, 29);
    let childData = data.slice(0, 16)
    data = [...data, ...childData]
    let curIndex = useRef(0)
    let curMs = useRef(10)
    let [dataDisplay, setDataDisplay] = useState(data.slice(curIndex.current, curIndex.current + 5))



    // if (curIndex.current + 5 < data.length) {
    //     setTimeout(() => {
    //         curIndex.current += 1
    //         curMs.current += 3
    //         setDataDisplay(data.slice(curIndex.current, curIndex.current + 5))
    //     }, curMs.current);

    // }

    useEffect(() => {
        let itemGacha = document.getElementsByClassName(style.disPlay)[0];
        itemGacha.style.transform = `translateX(-${data.length * 300 - 1500}px)`
    }, [])

    return (
        <div className={style["gacha-container"]}>
            <div className={style.disPlay}
                style={{
                    width: `${data.length * 300}px`
                }}
            >
                {
                    data.map((e, i) => (
                        <Item key={i} dataItem={e} />
                    ))}
            </div>
            <div className={style["line"]}></div>
        </div>
    );
};

export default Gacha;
