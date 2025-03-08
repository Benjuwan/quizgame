import { ReactNode, useState } from "react";
import { FetchAnswersDataContext } from "./GetFetchAnswersDataContext";
import { answerResultType, resultType } from "../ts/typeQuiz";

type defaultContext = {
    children: ReactNode
}

export const FetchAnswersDataContextFlagment = (props: defaultContext) => {
    /* jsonで取得したデータの格納用配列 */
    const [fetchAnswersData, setFetchAnswersData] = useState<answerResultType[]>([]);

    /* 得点と回答内容の検証チェック */
    const [scoreChecker, setScoreChecker] = useState<resultType | undefined>(undefined);

    /* Context は、更新・変更時に「それを参照している全コンポーネントが再レンダリングされる」ため、本来それぞれ定義すべきだが fetchAnswersData と scoreChecker は相関関係にあるので一緒に指定している */
    return (
        <FetchAnswersDataContext value={
            {
                fetchAnswersData, setFetchAnswersData,
                scoreChecker, setScoreChecker
            }
        }>
            {props.children}
        </FetchAnswersDataContext>
    );
}
