import { createContext } from "react";
import { answerResultType, resultType } from "../ts/typeQuiz";

type fetchAnswersDataType = {
    fetchAnswersData: answerResultType[];
    setFetchAnswersData: React.Dispatch<React.SetStateAction<answerResultType[]>>;
    scoreChecker: resultType | undefined;
    setScoreChecker: React.Dispatch<React.SetStateAction<resultType | undefined>>;
};

export const FetchAnswersDataContext = createContext({} as fetchAnswersDataType);