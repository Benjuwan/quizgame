import { useContext } from "react";
import { quizChoicesType, quizType, yourAnsweredType } from "../../ts/typeQuiz";
import { QuestionCounterContext } from "../../providers/QuestionCounterContext";
import { QuizCollectAnswerScoresContext } from "../../providers/QuizCollectAnswerScoresContext";
import { useConvertTargetType } from "../useConvertTargetType";

export const useViewQuizAndAnswers = (getData: quizType[]) => {
    const { questionCounter } = useContext(QuestionCounterContext);
    const { quizCollectAnswerScores } = useContext(QuizCollectAnswerScoresContext);

    const { convertTargetType } = useConvertTargetType();

    /* keyof： 対象がオブジェクト型の場合、そのキー・プロパティ名から型（文字列リテラル）を抽出 */
    const _checkSelectedAnswers: (selectedAnswers: string[], targetPositon: keyof quizChoicesType) => yourAnsweredType[] | undefined = (
        selectedAnswers: string[],
        targetPositon: keyof quizChoicesType // 'one' | 'two' | 'three'
    ) => {
        if (selectedAnswers.length === 0) {
            return; // 早期終了
        }

        /**
         * 全要素に対して先ずは map処理を行って返却値を yourAnsweredType または undefined に絞っておく
         * 次に その条件を基に filter処理で undefined のものをはじく（＝ 先の map処理により yourAnsweredType のものだけが返される）ので元の配列順序が維持できる処理の流れにしている
         * ……が、後工程で順序が乱れるため questionNumber（質問の順番）を用意して後から明示的にソートしている
        */
        const quizChoices = getData.map((quizData, i) => {
            return {
                questionNumber: i + 1,
                quiz: quizData.quiz,
                choices: quizData.choices
            }
        });

        // ユーザーの選択した回答を（元データ：getData から）抽出
        const theAnswered: yourAnsweredType[] = Object.entries(quizChoices).map((choice, i) => {
            if (
                typeof choice[1].choices[targetPositon] !== 'undefined' &&
                choice[1].choices[targetPositon].point === selectedAnswers[i]
            ) {
                return {
                    questionNumber: choice[1].questionNumber,
                    question: choice[1].quiz,
                    answered: choice[1].choices[targetPositon].txt,
                    score: choice[1].choices[targetPositon].point
                }
            }
            return undefined;
        }).filter((quizData): quizData is yourAnsweredType => typeof quizData !== 'undefined');

        return theAnswered;
    }

    const getViewQuizAndAnswers: () => yourAnsweredType[] | undefined = () => {
        if (questionCounter === getData.length) {
            // ユーザーの選択した回答配列（ theAnswered ）を格納するための配列
            const viewQuizAndAnswers: yourAnsweredType[][] = [];

            for (const answerScore of Object.entries(quizCollectAnswerScores)) {
                const targetKey: keyof quizChoicesType | undefined = convertTargetType(answerScore[0]); // [0]はラベル名：'one' | 'two' | 'three'...

                if (typeof targetKey !== 'undefined') {
                    const theAnswered: yourAnsweredType[] | undefined = _checkSelectedAnswers(quizCollectAnswerScores[targetKey], targetKey);
                    if (typeof theAnswered !== 'undefined') {
                        viewQuizAndAnswers.push(theAnswered);
                    }
                }
            }

            /* 2次元配列を1次元配列に変換（フラットに）して、質問数の昇順ソートしたものを返却 */
            const sortedViewQuizAndAnswers: yourAnsweredType[] = viewQuizAndAnswers.flat().sort((ahead, behind) => {
                if (ahead.questionNumber < behind.questionNumber) {
                    return -1
                } else {
                    return 1;
                }
            });

            return sortedViewQuizAndAnswers;
        }
    }

    return { getViewQuizAndAnswers }
}