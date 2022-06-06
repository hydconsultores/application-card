import React, { FC, useState } from "react";
import { Input,Button,} from "antd";
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
const Contador = () => {
    const [count, setCount] = useState(0)

    const incrementCount = (increment: any) => {

        setCount(count + increment)
    }

    const deprecateCount = (increment: any) => {
        
        if( (count + increment) < 0){
            return
        }
        setCount(count + increment)
    }
    return (
        <div className="tr-cantidad">
            <ButtonIncrementPlus increment={-1} onClickFunction={deprecateCount} />
                <Input readOnly className="galeria-input" type="Number" defaultValue="0" value={count} />
            <ButtonIncrementMin increment={1} onClickFunction={incrementCount} />
        </div>
    )
}

export default Contador