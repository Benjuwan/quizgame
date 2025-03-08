import { createContext } from "react";
import { quizCollectAnswerScoresType } from "../ts/typeQuiz";

type quizCollectAnswerScoresContextType = {
    quizCollectAnswerScores: quizCollectAnswerScoresType;
    setQuizCollectAnswerScores: React.Dispatch<React.SetStateAction<quizCollectAnswerScoresType>>;
};

export const QuizCollectAnswerScoresContext = createContext({} as quizCollectAnswerScoresContextType);