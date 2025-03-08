import { ReactNode, useState } from "react";
import { QuestionCounterContext } from "./QuestionCounterContext";

type defaultContext = {
    children: ReactNode
}

export const QuestionCounterContextFlagment = (props: defaultContext) => {
    /* 設問数のカウンター */
    const [questionCounter, setQuestionCounter] = useState<number>(0);

    return (
        <QuestionCounterContext value={
            {
                questionCounter,
                setQuestionCounter
            }
        }>
            {props.children}
        </QuestionCounterContext>
    );
}