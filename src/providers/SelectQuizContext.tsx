import { createContext } from "react";

type SelectQuizContextType = {
    selectQuiz: string;
    setSelectQuiz: React.Dispatch<React.SetStateAction<string>>;
};

export const SelectQuizContext = createContext({} as SelectQuizContextType);