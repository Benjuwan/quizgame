import { quizCollectAnswerScoresType, quizChoicesType } from "../../ts/typeQuiz";
import { useConvertTargetType } from "../useConvertTargetType";

export const useCalcResultPoint = () => {
    const { convertTargetType } = useConvertTargetType();

    /* 結果表示に関する点数関連（各項目の合計点数を取得）*/
    const calcResultPoint: (updateQuizCollectAnswerScores: quizCollectAnswerScoresType) => number = (updateQuizCollectAnswerScores: quizCollectAnswerScoresType) => {
        /* 空以外のものを抽出し、抽出した文字列:string を数値:number へ型変換して返す */
        const _clearCounterAct: (filterTargetAry: string[]) => number[] = (filterTargetAry: string[]) => {
            return filterTargetAry.filter(aryEl => {
                return !(aryEl === '');
            }).map(aryEl => {
                return Number(aryEl);
            });
        }

        /* 対象配列の中身有無で判定して空なら 0 を指定 */
        const _getSumScore: (score: number[]) => number = (score: number[]) => {
            if (score.length > 0) {
                return score.reduce((acuu, curr) => {
                    return acuu + curr;
                });
            } else {
                return 0;
            }
        }

        const results: number[] = [];
        for (const answerScore of Object.entries(updateQuizCollectAnswerScores)) {
            const targetKey: keyof quizChoicesType | undefined = convertTargetType(answerScore[0]);

            if (typeof targetKey !== 'undefined') {
                const resultBox: number[] = _clearCounterAct(updateQuizCollectAnswerScores[targetKey]);
                const result: number = _getSumScore(resultBox);
                results.push(result);
            }
        }

        /* 各項目の合計点数を取得 */
        return results.reduce((acuu, curr) => acuu + curr);
    }
    
    return {calcResultPoint}
}