import { useContext } from "react";
import { resultType } from "../../ts/typeQuiz";
import { useCreateAnswersData } from "./useCreateAnswersData";
import { FetchAnswersDataContext } from "../../providers/GetFetchAnswersDataContext";

export const useGetQuizResult = () => {
    const { setScoreChecker } = useContext(FetchAnswersDataContext);
    const { createAnswersData } = useCreateAnswersData();

    const getQuizResult: (score: number) => (() => void) | undefined = (score: number) => {
        /* 得点（score）別に回答データを描画 */
        if (score >= 1000) {
            createAnswersData('answer-high.json');
        }

        else if ((score <= 999) && (score >= 540)) {
            createAnswersData('answer-medium.json');
        }

        else if ((score <= 539) && (score >= 1)) {
            createAnswersData('answer-low.json');
        }

        else {
            alert(`エラーが発生しました。\n3秒後に再読み込みします。\n申し訳ありませんが最初からお願いします。`);
            const theTimeoutId: number = setTimeout(() => location.reload(), 3000);

            return () => {
                clearTimeout(theTimeoutId);
            }
        }

        /* 得点の1桁台が【0】ではない者を選別。blackListChecker は 1桁台を取得した文字列 */
        const blackListChecker: boolean = score.toString().split('').at(-1) !== '0';

        const result: resultType = {
            score: score,
            blackListChecker: blackListChecker
        }

        setScoreChecker(result);
    }

    return { getQuizResult }
}