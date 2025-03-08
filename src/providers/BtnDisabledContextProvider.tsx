import { ReactNode, useState } from "react";
import { BtnDisabledContext } from "./BtnDisabledContext";

type defaultContext = {
    children: ReactNode
}

export const BtnDisabledContextFlagment = (props: defaultContext) => {
    /* 次へボタンの制御用State */
    const [isBtnDisabled, setBtnDisabled] = useState<boolean>(true);

    return (
        <BtnDisabledContext value={
            {
                isBtnDisabled,
                setBtnDisabled
            }
        }>
            {props.children}
        </BtnDisabledContext>
    );
}