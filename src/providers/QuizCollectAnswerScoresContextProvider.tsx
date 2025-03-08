import { ReactNode, useState } from "react";
import { QuizCollectAnswerScoresContext } from "./QuizCollectAnswerScoresContext";
import { quizCollectAnswerScoresType } from "../ts/typeQuiz";

type defaultContext = {
    children: ReactNode
}

export const QuizCollectAnswerScoresContextFlagment = (props: defaultContext) => {
    /* 設問の（radioボタンの）項目・選択肢ごとの得点数を管理する配列 */
    const [quizCollectAnswerScores, setQuizCollectAnswerScores] = useState<quizCollectAnswerScoresType>({});

    return (
        <QuizCollectAnswerScoresContext value={
            {
                quizCollectAnswerScores, setQuizCollectAnswerScores
            }
        }>
            {props.children}
        </QuizCollectAnswerScoresContext>
    );
}