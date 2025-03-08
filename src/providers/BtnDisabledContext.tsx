import { createContext } from "react";

type BtnDisabledContextType = {
    isBtnDisabled: boolean;
    setBtnDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BtnDisabledContext = createContext({} as BtnDisabledContextType);