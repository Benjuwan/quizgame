import { memo, SyntheticEvent, useContext } from "react";
import { quizType } from "../ts/typeQuiz";
import { QuestionCounterContext } from "../providers/QuestionCounterContext";
import { useChangeCorrectChoice } from "../hooks/useChangeCorrectChoice";

export const QuizContents = memo(({ getData }: { getData: quizType[] }) => {
    const { questionCounter } = useContext(QuestionCounterContext);

    const { checkedEitherOf, changeCorrectChoice } = useChangeCorrectChoice();

    return (
        <>
            {questionCounter < getData.length && (
                <div className="max-w-[800px] mx-auto mb-10 p-6 rounded border-none shadow-[0_0_4px_rgba(0,0,0,.45)_inset]">
                    {getData.map((quizData, i) => (
                        questionCounter === i ? (
                            <div key={i} className="firstContents">
                                <h2 className="font-normal mb-4 p-4 bg-[#dadada] rounded shadow-inner shadow-[#929292]">
                                    <span className="text-sm font-bold block border-b border-[#333] mb-3">設問：{i + 1}/{getData.length}</span>
                                    {quizData.quiz}
                                </h2>

                                {quizData.imgsrc && (
                                    <p className="thumbnails">
                                        <img
                                            src={quizData.imgsrc}
                                            alt={`設問「${quizData.quiz}」を視覚的に表現した画像`}
                                            className="block w-[clamp(120px,calc(100vw/2),200px)] mx-auto my-4"
                                        />
                                    </p>
                                )}

                                <ul className="list-none rounded md:pt-2 md:grid md:grid-cols-[repeat(3,1fr)] md:place-items-center md:gap-8">
                                    {Object.entries(quizData.choices).map(choice => (
                                        <li key={choice[0]} className="labelItem leading-[1.75] mb-4 md:mb-0">
                                            <label
                                                htmlFor={choice[0]}
                                                onClick={(e: SyntheticEvent<HTMLLabelElement>) =>
                                                    choice[1].adjust
                                                        ? changeCorrectChoice(e.currentTarget, choice[1].adjust)
                                                        : checkedEitherOf(e.currentTarget)
                                                }
                                            >
                                                <input
                                                    id={choice[0]}
                                                    type="radio"
                                                    name="quizChoices"
                                                    value={choice[1].point}
                                                    className="m-0 inline-block align-baseline"
                                                />
                                                {choice[1].txt}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null
                    ))}
                </div>
            )}
        </>
    );
});