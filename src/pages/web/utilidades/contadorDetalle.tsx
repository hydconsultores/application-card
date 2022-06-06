import React, { FC, useState } from "react";
import { Input,Button} from "antd";
import MinusOutlined from "@ant-design/icons/lib/icons/MinusOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

const ButtonIncrementPlus : FC<any> = ({ increment, onClickFunction }) => {
    const handleClick = () => {
        onClickFunction(increment);
    };
    return (
        <>
            <Button onClick={handleClick} type="primary"  className="selButton plus"   icon={<MinusOutlined />}  />
        </>
    );
}
const ButtonIncrementMin: FC<any> =  ({increment, onClickFunction} )=> {
    const handleClick = () => {
        onClickFunction(increment)
    }
    return (
        <>
        <Button onClick={handleClick} type="primary"className="selButton minus" icon={<PlusOutlined />}  />
        </>
    )
}
const ContadorDetalle : FC<any> = ({ cantidadOnChange }) => {
    const [count, setCount] = useState(0)
    const incrementCount = (increment: any) => {

        setCount(count + increment)
        cantidadOnChange(count + increment)
    }

    const deprecateCount = (increment: any) => {
        
        if( (count + increment) < 0){
            return
        }
        setCount(count + increment)
        cantidadOnChange(count + increment)
    }
    return (
        
        <div>
            <ButtonIncrementPlus increment={-1} onClickFunction={deprecateCount} />
                <Input readOnly className="galeria-input" type="Number" defaultValue="0" value={count} />
            <ButtonIncrementMin increment={1} onClickFunction={incrementCount} />
        </div>
    )
}

export default ContadorDetalle