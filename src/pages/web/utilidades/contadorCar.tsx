import React, { FC, Props, useEffect, useState } from "react";
import { Row, Col, Layout, Modal, Alert, Spin, Input,Button, Radio, AutoComplete, Dropdown, Menu } from "antd";
import MinusOutlined from "@ant-design/icons/lib/icons/MinusOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

const ButtonIncrementPlus : FC<any> = ({ increment, onClickFunction }) => {
    const handleClick = () => {
        onClickFunction(increment);
    };
    return (
        <>
            <Button onClick={handleClick} type="primary" className="selButton-home plus" icon={<MinusOutlined />}  />
        </>
    );
}
const ButtonIncrementMin: FC<any> =  ({increment, onClickFunction} )=> {
    const handleClick = () => {
        onClickFunction(increment)
    }
    return (
        <>
        <Button onClick={handleClick} type="primary" className="selButton-home minus" icon={<PlusOutlined />} />
        </>
    )
}

const ContadorCar : FC<any> = ({ producto,onChangeCantidad, valor, stock }) => {
    const [count, setCount] = useState(parseInt(valor) as number)

    const incrementCount = (increment: any) => {
        console.log("stock",stock)
        console.log("count",count)
        if((count + increment) <= stock ){
            setCount(count + increment)
            onChangeCantidad(count + increment,producto)
        }
    }

    const deprecateCount = (increment: any) => {
        
        if( (count + increment) < 0){
            console.log("count",count)
            return
        }
        setCount(count + increment)
        onChangeCantidad(count + increment,producto)
    }
    return (
        <div>
            <ButtonIncrementPlus increment={-1} onClickFunction={deprecateCount} />
                <Input readOnly className="galeria-input" type="Number" defaultValue="0" value={count} />
            <ButtonIncrementMin increment={1} onClickFunction={incrementCount} />
        </div>
    )
}

export default ContadorCar