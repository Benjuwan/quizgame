import { useRef, useContext, useState, useActionState, startTransition, memo, use, useMemo } from "react";
import { answerResultType, quizType } from "../ts/typeQuiz";
import { QuestionCounterContext } from "../providers/QuestionCounterContext";
import { SelectQuizContext } from "../providers/SelectQuizContext";
import { ViewAnswers } from "./ViewAnswers";
import { QuizBtn } from "./QuizBtn";

export const QuizBtnViewAnswerWrapper = memo(({ fetchdataPromise }: { fetchdataPromise: Promise<quizType[]> }) => {
    // use()でPromiseの中身を取得（Promiseが未完了ならこのコンポーネントはサスペンドする）
    const getData: quizType[] = use(fetchdataPromise);

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

    /* 回答の得点 */
    const scorePointRef = useRef<number>(0);

    const { questionCounter } = useContext(QuestionCounterContext);
    const { selectQuiz } = useContext(SelectQuizContext);

    const initAnswerResultType: answerResultType[] = [
        {
            title: '',
            txt: ''
        }
    ];
    const [fetchAnswersData, setFetchAnswersData] = useState<answerResultType[]>(initAnswerResultType);

    /* --------- useActionState｜React 19 --------- */
    // const [state, runAction, isPending] = useActionState(...
    const [, fetchAnswersDataAction, isPending] = useActionState(
        // async (currentState, payload) => {...
        /* payload：例えば、フォーム送信時の formData やレスポンスデータのような「何かしらのアクション結果で生じる返却値・データ」のこと */
        async () => {
            const highScorePoint: number = hasAdjustProp_absolute_100_flag ?
                ((questionCounter + 1) * 100) / (questionCounter + 1) :
                (questionCounter + 1) * 100;

            const mediumScorePoint: number = hasAdjustProp_absolute_100_flag ?
                ((questionCounter + 1) * 10) / (questionCounter + 1) :
                (questionCounter + 1) * 10;

            /* urlPathPart： フェッチする回答結果JSONファイルのパス名 */
            let urlPathPart: string = 'answer-low.json';
            if (scorePointRef.current >= highScorePoint) {
                urlPathPart = 'answer-high.json';
            } else if (scorePointRef.current >= mediumScorePoint && scorePointRef.current < highScorePoint) {
                urlPathPart = 'answer-medium.json';
            }

            const fetchUrlPath: string = `${import.meta.env.VITE_FETCH_URL}/jsons/answers/${selectQuiz}/${urlPathPart}`;

            const res: Response = await fetch(fetchUrlPath);
            const resObj: answerResultType[] = await res.json();

            setFetchAnswersData(resObj);

            // return resObj; // return newState;
            return null;
        },
        // initAnswerResultType // initialState
        null
    );

    const withTransition_fetchAnswersDataAction: () => void = () => {
        // startTransition がないと（ runAction または Context の外部で dispatch したと）怒られる
        startTransition(() => {
            fetchAnswersDataAction();
        });
    }

    return (
        <>
            {questionCounter < getData.length ?
                <QuizBtn props={{
                    getData: getData,
                    scorePointRef: scorePointRef,
                    withTransition_fetchAnswersDataAction: withTransition_fetchAnswersDataAction
                }} /> :
                <>
                    {isPending ? <p>結果読み込み中</p> : <p>ゲームクリア！</p>}
                    <ViewAnswers props={{
                        getData: getData,
                        scorePointRef: hasAdjustProp_absolute_100_flag ?
                            Math.floor(scorePointRef.current / questionCounter) :
                            scorePointRef,
                        fetchAnswersData: fetchAnswersData
                    }} />
                </>
            }
        </>
    );
});