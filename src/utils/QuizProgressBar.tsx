import { memo, use, useContext } from "react";
import { quizType } from "../ts/typeQuiz";
import { QuestionCounterContext } from "../providers/QuestionCounterContext";

export const QuizProgressBar = memo(({ fetchdataPromise }: { fetchdataPromise: Promise<quizType[]> }) => {
    // use()でPromiseの中身を取得（Promiseが未完了ならこのコンポーネントはサスペンドする）
    const getData: quizType[] = use(fetchdataPromise);

    const { questionCounter } = useContext(QuestionCounterContext);

    return (
        <>
            {questionCounter < getData.length &&
                /* 設問数分の進行バー・ポイントを生成 */
                <div id="progressBar" className="w-[clamp(5rem,calc(100vw/2),50rem)] mx-auto mb-[1.25rem] md:w-[clamp(80px,calc(100vw/2),800px)]">
                    <ul className="flex justify-center gap-[2%]">
                        {getData.map((_, i) => (
                            <li key={i}
                                className={`rounded-[1.875rem] w-[4rem] h-[0.75rem] bg-[#dadada] ${(
                                    i <= questionCounter ||
                                    i === 0
                                ) ? 'bg-[gold]' : ''}`}
                            >&nbsp;</li>
                        ))}
                    </ul>
                </div>
            }
        </>
    );
});