import { createContext } from "react";

type QuestionCounterType = {
    questionCounter: number;
    setQuestionCounter: React.Dispatch<React.SetStateAction<number>>;
};

export const QuestionCounterContext = createContext({} as QuestionCounterType);