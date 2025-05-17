import { useContext } from "react";
import { quizChoicesType } from "../ts/typeQuiz";
import { QuizCollectAnswerScoresContext } from "../providers/QuizCollectAnswerScoresContext";

export const useConvertTargetType = () => {
    const { quizCollectAnswerScores } = useContext(QuizCollectAnswerScoresContext);

    /**
     * keyof： 対象がオブジェクト型の場合、そのキー・プロパティ名から型（文字列リテラル）を抽出
     * （使用例）keyof typeof oneObj： typeof で oneObj の型を調べて（オブジェクト型の場合は）keyof でそのキー・プロパティ名から型（文字列リテラル）を抽出
    */
    const convertTargetType: (value: string) => keyof quizChoicesType | undefined = (value: string) => {
        const type: string | null = value;

        /* type in quizCollectAnswerScores： quizCollectAnswerScores（オブジェクト）の中に type の文字列が一致するキー・プロパティ名があるかをチェック */
        if (type !== null && type in quizCollectAnswerScores) {
            /* type in quizCollectAnswerScores を通じて「既に存在が保証されている型」を type に指定（型アサーション： 型推論の上書き）*/
            const targetKey = type as keyof quizChoicesType;
            return targetKey;
        }
    }

    return { convertTargetType }
}