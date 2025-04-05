import { memo, useMemo } from "react";
import { answerResultType, quizType, yourAnsweredType } from "../ts/typeQuiz";
import { useViewQuizAndAnswers } from "../hooks/answers/useViewQuizAndAnswers";

type viewAnswersType = {
    getData: quizType[];
    fetchAnswersData: answerResultType[];
    scorePointRef: React.RefObject<number> | number;
};

const TheCommonContent = ({ answer, isSingleComments }: {
    answer: answerResultType,
    isSingleComments: boolean
}) => {
    return (
        <>
            <h2 className="text-center text-[clamp(24px,calc(100vw/24),32px)] font-normal mb-4 md:text-[18px]">{answer.title}</h2>
            {answer.img &&
                <div className="h-[clamp(460px,calc(100vw/2),640px)] mb-8 md:h-[clamp(160px,calc(100vw/5),280px)] md:mb-[20px]">
                    <img className="object-contain w-full h-full" src={answer.img} alt={`「${answer.title}」の参照画像`} />
                </div>
            }
            <p className="wrap-anywhere">{answer.txt}</p>
            {/* コメント（所感）が複数ある場合 */}
            {isSingleComments ||
                <>{answer.comment && <p>{answer.comment}</p>}</>
            }
        </>
    );
}

export const ViewAnswers = memo(({ props }: { props: viewAnswersType }) => {
    const { getData, fetchAnswersData, scorePointRef } = props;

    /* useMemo はどちらも同じ依存配列（ fetchAnswersData ）なので eslint-disable-next-line react-hooks/exhaustive-deps は一度宣言するだけで良い */
    const { getViewQuizAndAnswers } = useViewQuizAndAnswers(getData);
    const viewQuizAndAnswers: yourAnsweredType[] | undefined = useMemo(() => {
        return getViewQuizAndAnswers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchAnswersData]);

    /* 各回答データに属するコメント（所感）数によるフラグ */
    const isSingleComments: boolean = useMemo(() => {
        const withCommentData: answerResultType[] = [...fetchAnswersData].filter(d => d.comment);
        return withCommentData.length === 1;
    }, [fetchAnswersData]);

    const resetBtn: () => void = () => location.reload();

    return (
        <div className="results-container">
            {fetchAnswersData.length > 0 ? (
                <div className="w-[clamp(280px,100%,640px)] mx-auto py-10 px-4 bg-[#dadada] rounded">
                    <h2 className="text-center text-[clamp(24px,calc(100vw/24),32px)] font-normal mb-4 md:text-[18px]">
                        得点：{typeof scorePointRef === 'number' ? scorePointRef : scorePointRef.current}
                    </h2>

                    {/* コメント（所感）が一つだけの場合 */}
                    {isSingleComments && (
                        <div className="mb-8">
                            {fetchAnswersData[0].comment && <p className="text-[1rem] leading-7 mb-8">{fetchAnswersData[0].comment}</p>}
                        </div>
                    )}

                    {typeof viewQuizAndAnswers !== 'undefined' && viewQuizAndAnswers.length > 0 && (
                        <details className="my-10 text-sm md:text-sm">
                            <summary className="bg-[#333] text-white border border-transparent leading-8 w-fit px-4 tracking-wider cursor-pointer hover:bg-white hover:text-[#333] hover:transition-all hover:duration-250">
                                自分の回答を確認する
                            </summary>
                            <ul className="text-[1rem] p-4 shadow-inner shadow-black/45 rounded list-none md:text-[1rem]">
                                {viewQuizAndAnswers.map(viewQuizAndAnswer => (
                                    <li key={viewQuizAndAnswer.questionNumber} className="leading-6 last:border-b-0 last:mb-0 last:pb-0 border-b border-[#333] mb-4 pb-4">
                                        <p className="pl-4">
                                            <span className="block indent-[-1em] font-bold">
                                                質問 {viewQuizAndAnswer.questionNumber}
                                                {viewQuizAndAnswer.score.length > 0 && <> ／ 得点 {viewQuizAndAnswer.score}</>}
                                            </span>
                                            {viewQuizAndAnswer.question}
                                        </p>
                                        <p className="pl-4">
                                            <span className="block indent-[-1em] font-bold text-[#196cca]">回答：</span>
                                            {viewQuizAndAnswer.answered}
                                        </p>
                                        <p className="pl-4">
                                            <span className="block indent-[-1em] font-bold text-[#158815]">正答：</span>
                                            {viewQuizAndAnswer.correctAnswer}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    )}

                    <div id="resultChild" className="mb-[2.5em] md:max-w-[640px] lg:max-w-[1080px] mx-auto md:flex md:justify-center md:items-start md:gap-8 lg:justify-start">
                        {fetchAnswersData.map((answer, i) => (
                            <div className="resEls text-sm text-[#333] leading-7 rounded shadow-inner shadow-black/45 mb-20 p-6 md:text-[1rem] md:w-full md:last:mb-0 lg:mb-20" key={i}>
                                {answer.url ? (
                                    <a href={answer.url} target="_blank" className="block no-underline text-[#333]">
                                        <TheCommonContent
                                            answer={answer}
                                            isSingleComments={isSingleComments}
                                        />
                                    </a>
                                ) : (
                                    <TheCommonContent
                                        answer={answer}
                                        isSingleComments={isSingleComments}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        id="resetBtn"
                        type="button"
                        onClick={resetBtn}
                        className="appearance-none border-none outline-none cursor-pointer block w-[clamp(80px,calc(100vw/2),320px)] mx-auto mb-10 leading-11 bg-[#333] border border-transparent text-white tracking-wider hover:transition-all hover:duration-[.5s] hover:border-[#333] hover:text-[#333] hover:bg-white"
                    >
                        最初からやり直す
                    </button>
                </div>
            ) : null}
        </div>
    );
});