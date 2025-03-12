import { useContext, useMemo } from "react";
import { quizType, resultType } from "../../ts/typeQuiz";
import { useCreateAnswersData } from "./useCreateAnswersData";
import { FetchAnswersDataContext } from "../../providers/GetFetchAnswersDataContext";
import { QuestionCounterContext } from "../../providers/QuestionCounterContext";

export const useGetQuizResult = (getData?: quizType[]) => {
    const { setScoreChecker } = useContext(FetchAnswersDataContext);
    const { questionCounter } = useContext(QuestionCounterContext);
    const { createAnswersData } = useCreateAnswersData();

    /* 選択したクイズデータに回答強制（'adjust'プロパティ・キー）があるかどうかチェック（＝必ず100点になる機能の有無を確認）*/
    const hasAdjustProp_absolute_100_flag: boolean | undefined = useMemo(() => {
        if (typeof getData === 'undefined') {
            return; // 早期終了
        }

        for (const quizData of getData) {
            for (const choice of Object.values(quizData.choices)) {
                if ('adjust' in choice) {
                    return 'adjust' in choice;
                }
            }
        }
    }, [getData]);

    const getQuizResult: (score: number) => (() => void) | undefined = (score: number) => {
        const highScorePoint: number = (questionCounter + 1) * 100;
        const mediumScorePoint: number = (questionCounter + 1) * 10;

        /* 得点（score）別に回答データを描画 */
        if (score >= highScorePoint) {
            createAnswersData('answer-high.json');
        }

        else if (score >= mediumScorePoint && score < highScorePoint) {
            createAnswersData('answer-medium.json');
        }

        else if (score >= 0 && score < mediumScorePoint) {
            createAnswersData('answer-low.json');
        }

        else {
            alert(`エラーが発生しました。\n1秒後に再読み込みします。\n申し訳ありませんが最初からお願いします。`);
            const theTimeoutId: number = setTimeout(() => location.reload(), 1000);

            return () => {
                clearTimeout(theTimeoutId);
            }
        }

        const absolute_100 = Math.floor(score / (questionCounter + 1)); // 必ず 100 になるように計算調整

        const result: resultType = {
            // 選択したクイズデータに回答強制（必ず100点になる機能）があれば absolute_100 を指定
            score: typeof hasAdjustProp_absolute_100_flag === 'undefined' ? score : absolute_100
        }

        setScoreChecker(result);
    }

    return { getQuizResult }
}