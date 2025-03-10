import { ReactNode, useState } from "react";
import { SelectQuizContext } from "./SelectQuizContext";

type defaultContext = {
    children: ReactNode
}

export const SelectQuizContextFlagment = (props: defaultContext) => {
    /* クイズゲームの選択肢を管理するState */
    const [selectQuiz, setSelectQuiz] = useState<string>('');

    return (
        <SelectQuizContext value={
            {
                selectQuiz,
                setSelectQuiz
            }
        }>
            {props.children}
        </SelectQuizContext>
    );
}