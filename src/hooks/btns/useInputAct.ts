import { useContext } from "react";
import { QuestionCounterContext } from "../../providers/QuestionCounterContext";
import { BtnDisabledContext } from "../../providers/BtnDisabledContext";
import { QuizCollectAnswerScoresContext } from "../../providers/QuizCollectAnswerScoresContext";
import { quizChoicesType, quizCollectAnswerScoresType } from "../../ts/typeQuiz";
import { useConvertTargetType } from "../useConvertTargetType";
import { useCalcResultPoint } from "./useCalcResultPoint";

export const useInputAct = (finalQuestionCounter: number) => {
    const { questionCounter, setQuestionCounter } = useContext(QuestionCounterContext);
    const { isBtnDisabled, setBtnDisabled } = useContext(BtnDisabledContext);
    const { quizCollectAnswerScores, setQuizCollectAnswerScores } = useContext(QuizCollectAnswerScoresContext);

    const { convertTargetType } = useConvertTargetType();
    const { calcResultPoint } = useCalcResultPoint();

    /* 回答（履歴）の編集用メソッド */
    const _updateChoices: (typeAssignment: string | null, spliceStart: number, spliceReplaceValue: string, spliceFinish_withDefault?: number | undefined) => quizCollectAnswerScoresType | undefined = (
        typeAssignment: string | null,
        spliceStart: number,
        spliceReplaceValue: string,
        spliceFinish_withDefault: number | undefined = 1
    ) => {
        if (typeAssignment === null) {
            return; // 早期終了
        }

        const targetKey: keyof quizChoicesType | undefined = convertTargetType(typeAssignment);

        if (typeof targetKey === 'undefined') {
            return;
        }

        /* quizCollectAnswerScoresType はオブジェクト（{ [choiceLabel: string]: string[]... }）なので、配列コピーして処理しないとオブジェクト全体として更新（choiceLabel の全配列の当該インデックス箇所に得点が格納）されてしまう */
        const shallowCopy: string[] = [...quizCollectAnswerScores[targetKey]];

        /* incrementAct： 設問別配列内('one' | 'two' | 'three')の当該配列の値を上書き（'' → jsonデータ内の当該設問point）*/
        /* decrementAct： 設問別配列内('one' | 'two' | 'three')の当該配列の値をリセット（以前回答したjsonデータ内の当該設問point → ''）*/
        shallowCopy.splice(spliceStart, spliceFinish_withDefault, spliceReplaceValue);

        const updateQuizCollectAnswerScores: quizCollectAnswerScoresType = {
            ...quizCollectAnswerScores,
            [targetKey]: shallowCopy // 処理済み shallowCopy を格納
        };

        return updateQuizCollectAnswerScores;
    }

    const incrementAct: () => number | undefined = () => {
        if (questionCounter <= 0 && questionCounter >= finalQuestionCounter) {
            return;
        }

        setQuestionCounter((prevCount) => prevCount + 1);

        /* 項目・選択肢ごとの得点数を管理（NEXT） */
        const labelEls: NodeListOf<HTMLLIElement> = document.querySelectorAll<HTMLLIElement>('.labelItem');
        for (const labelEl of labelEls) {
            const radioEl: HTMLInputElement | null = labelEl.querySelector<HTMLInputElement>('input[type="radio"]');

            if (radioEl !== null && radioEl.checked) {
                const updateQuizCollectAnswerScores: quizCollectAnswerScoresType | undefined = _updateChoices(radioEl.getAttribute('id'), questionCounter, radioEl.value);

                if (typeof updateQuizCollectAnswerScores === 'undefined') {
                    return;
                }

                setQuizCollectAnswerScores(updateQuizCollectAnswerScores);

                /* 最終問題の時にボタンクリックで、結果表示に関する関数たちを実行 */
                if (questionCounter === finalQuestionCounter) {
                    return calcResultPoint(updateQuizCollectAnswerScores);
                }
            }
        }
    }

    const decrementAct: () => void = () => {
        if (questionCounter <= 1 && questionCounter >= finalQuestionCounter) {
            return;
        }

        /* 前問に戻った際に次へボタンの disabled が解除されていれば、改めて disabled を付与して設問を選択しないと進めないようにする */
        if (!isBtnDisabled) {
            setBtnDisabled(true);
        }

        setQuestionCounter((prevCount) => prevCount - 1);

        for (const answerScore of Object.entries(quizCollectAnswerScores)) {
            /* 当該設問数で回答済み（当該インデックス箇所が空ではない）の得点配列を処理対象とする */
            if (answerScore[1][questionCounter - 1].length > 0) {
                /* 設問数は【1】カウントスタートだが、配列は【0】カウントスタートなので処理の整合性を取るために questionCounter - 1 */
                const updateQuizCollectAnswerScores: quizCollectAnswerScoresType | undefined = _updateChoices(answerScore[0], questionCounter - 1, '');

                if (typeof updateQuizCollectAnswerScores === 'undefined') {
                    return;
                }

                setQuizCollectAnswerScores(updateQuizCollectAnswerScores);
            }
        }
    }

    return { incrementAct, decrementAct }
}