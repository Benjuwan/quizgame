import { useContext, useMemo } from "react";
import { quizCollectAnswerScoresType, quizType } from "../../ts/typeQuiz";
import { QuizCollectAnswerScoresContext } from "../../providers/QuizCollectAnswerScoresContext";

export const useSubscribeAnswers = (getQuizData: quizType[]) => {
    const { setQuizCollectAnswerScores } = useContext(QuizCollectAnswerScoresContext);

    /* 読み込んだクイズデータ内において最も多くの回答選択肢数（クイズ別の設問数）を取得 */
    const maxChoices = useMemo(() => Math.max(...getQuizData.map(quiz => Object.keys(quiz.choices).length)), [getQuizData]);

    /* quizCollectAnswerScoresType の key（プロパティ名）の生成準備 */
    const choiceLabel: Set<string> = useMemo(() => {
        const quizChoices: string[] = [...getQuizData]
            .map((quiz) => {
                // 最も多くの回答選択肢数を持った設問ラベル（例：'one' | 'two' | 'three'）を取得
                if (Object.keys(quiz.choices).length === maxChoices) {
                    return Object.keys(quiz.choices);
                }
            })
            .filter((quizChoice): quizChoice is string[] => typeof quizChoice !== 'undefined')
            .flat();

        // 重複排除した、最多設問数に準じた設問ラベル（例：'one' | 'two' | 'three'）を返す
        return new Set(quizChoices);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getQuizData]);

    const subscribeAnswers: () => void = () => {
        /**
         * 設問数（ Object.values(quizDataChoices) ）に応じた空要素('')を配列（ scoreEntriesAry ）にセットしておく
         * 空要素をセットすることにより戻るボタンアクション（ decrementAct ）で、
         *「一つ前の設問（数）に応じた」設問別配列内('one' | 'two' | 'three')の当該配列の値をリセットできるようになる
         * decrementAct メソッドの参照元： src/hooks/btns/useInputAct.ts
        */

        /* 設問数（getQuizData.length）に応じた空要素('')を用意 */
        const scoreEntriesAry: string[] = new Array(getQuizData.length).fill('');

        /* quizCollectAnswerScores の生成 */
        /* 集合（Set<string>）を1次元配列（string[]）に変換して処理を進める */
        const theChoices: quizCollectAnswerScoresType[] = Array.from(choiceLabel).flat().map(label => {
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