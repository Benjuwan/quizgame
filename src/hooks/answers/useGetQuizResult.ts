import { useContext } from "react";
import { resultType } from "../../ts/typeQuiz";
import { useCreateAnswersData } from "./useCreateAnswersData";
import { FetchAnswersDataContext } from "../../providers/GetFetchAnswersDataContext";
import { QuestionCounterContext } from "../../providers/QuestionCounterContext";

export const useGetQuizResult = () => {
    const { setScoreChecker } = useContext(FetchAnswersDataContext);
    const { questionCounter } = useContext(QuestionCounterContext);
    const { createAnswersData } = useCreateAnswersData();

    const getQuizResult: (score: number) => (() => void) | undefined = (score: number) => {
        const highScorePoint: number = (questionCounter + 1) * 100;
        const mediumScorePoint: number = (questionCounter + 1) * 10;

        /* 得点（score）別に回答データを描画 */
        if (score > mediumScorePoint && score <= highScorePoint) {
            createAnswersData('answer-high.json');
        }

        else if (score > 0 && score <= mediumScorePoint) {
            createAnswersData('answer-medium.json');
        }

        else if (score === 0) {
            createAnswersData('answer-low.json');
        }

        else {
            alert(`エラーが発生しました。\n3秒後に再読み込みします。\n申し訳ありませんが最初からお願いします。`);
            const theTimeoutId: number = setTimeout(() => location.reload(), 3000);

            return () => {
                clearTimeout(theTimeoutId);
            }
        }

        const absolute_100 = score / (questionCounter + 1); // 必ず 100 になるように計算調整

        const result: resultType = {
            score: absolute_100
        }

        setScoreChecker(result);
    }

    return { getQuizResult }
}