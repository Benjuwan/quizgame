import { useContext, useMemo } from "react";
import { quizChoicesType, quizCollectAnswerScoresType, quizType } from "../../ts/typeQuiz";
import { QuizCollectAnswerScoresContext } from "../../providers/QuizCollectAnswerScoresContext";

export const useSubscribeAnswers = (getQuizData: quizType[]) => {
    const { setQuizCollectAnswerScores } = useContext(QuizCollectAnswerScoresContext);

    const quizDataChoices: quizChoicesType[] = useMemo(() => getQuizData.map(quizData => quizData.choices), [getQuizData]);

    const subscribeAnswers: () => void = () => {
        /**
         * 設問数（ Object.values(quizDataChoices) ）に応じた空要素('')を配列（ scoreEntriesAry ）にセットしておく
         * 空要素をセットすることにより戻るボタンアクション（ decrementAct ）で、
         *「一つ前の設問（数）に応じた」設問別配列内('one' | 'two' | 'three')の当該配列の値をリセットできるようになる
         * decrementAct メソッドの参照元： src/hooks/btns/useInputAct.ts
        */

        /* 設問数（getQuizData.length）に応じた空要素('')を用意 */
        const scoreEntriesAry: string[] = new Array(getQuizData.length).fill('');

        /* quizCollectAnswerScoresType の key（プロパティ名）の生成準備 */
        const choiceLabel: string[][] = Object.values(quizDataChoices).map((eachQuizChoice, i) => {
            if (i === 0) {
                /* 設問項目名（例：'one' | 'two' | 'three'）を抽出 */
                return Object.keys(eachQuizChoice);
            }
        }).filter((eachQuizChoice): eachQuizChoice is string[] => typeof eachQuizChoice !== 'undefined');

        /* quizCollectAnswerScores の生成 */
        /* 2次元配列（string[][]）を1次元配列（string[]）に変換して処理を進める */
        const theChoices: quizCollectAnswerScoresType[] = choiceLabel.flat().map(label => {
            return {
                /* key（プロパティ名）は（オブジェクトの）ブラケット記法で動的に命名 */
                [label]: scoreEntriesAry
            }
        });

        /* Object.assign(target, src) ： {}（空オブジェクト）を用意し、スプレッド演算子で展開した theChoices の中身で上書き（格納）する */
        const objMarged_newChoices: quizCollectAnswerScoresType = Object.assign({}, ...theChoices);

        setQuizCollectAnswerScores(objMarged_newChoices);
    }

    return { subscribeAnswers }
}