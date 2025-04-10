import { memo, useContext, useEffect } from "react";
import { QuestionCounterContext } from "../providers/QuestionCounterContext";
import { BtnDisabledContext } from "../providers/BtnDisabledContext";
import { quizType } from "../ts/typeQuiz";
import { useSubscribeAnswers } from "../hooks/btns/useSubscribeAnswers";
import { useInputAct } from "../hooks/btns/useInputAct";

type quizBtnType = {
    getData: quizType[];
    scorePointRef: React.RefObject<number>; // このコンポーネントで得点数を取得している
    withTransition_fetchAnswersDataAction: () => void;
};

export const QuizBtn = memo(({ props }: { props: quizBtnType }) => {
    const { getData, scorePointRef, withTransition_fetchAnswersDataAction } = props;

    const { questionCounter } = useContext(QuestionCounterContext);
    const { isBtnDisabled, setBtnDisabled } = useContext(BtnDisabledContext);

    const { subscribeAnswers } = useSubscribeAnswers(getData);
    const { incrementAct, decrementAct } = useInputAct(getData.length - 1);

    const increment: () => void = () => {
        const score: number | undefined = incrementAct();

        if (typeof score === 'undefined') {
            return;
        }

        scorePointRef.current = score;
        withTransition_fetchAnswersDataAction(); // useActionState の実行関数
    }

    useEffect(() => {
        subscribeAnswers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ボタンクリック（設問切替）の度に、次へボタンの非活性化とスクロールトップを実行 
    useEffect(() => {
        setBtnDisabled(true);
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionCounter]);

    return (
        <>
            {questionCounter < getData.length &&
                <div className="max-w-[800px] m-auto">
                    <ol className="grid grid-cols-[repeat(2,1fr)] p-0">
                        <li className="justify-self-start"><button id="backBtn" className="appearance-none px-[2.5em] leading-[2.75rem] rounded text-[#333] bg-[gold] text-black border-transparent disabled:bg-[#dadada] text-[#a0a0a0] not-disabled:hover:cursor-pointer not-disabled:hover:transition not-disabled:hover:bg-[#fff4b6]" type="button" onClick={decrementAct} disabled={questionCounter === 0}>戻る</button></li>
                        <li className="justify-self-end">
                            <button id="nextBtn" className="appearance-none px-[2.5em] leading-[2.75rem] rounded text-[#333] bg-[gold] text-black border-transparent disabled:bg-[#dadada] text-[#a0a0a0] not-disabled:hover:cursor-pointer not-disabled:hover:transition not-disabled:hover:bg-[#fff4b6]" type="button" onClick={increment} disabled={isBtnDisabled}>
                                {questionCounter === getData.length - 1 ?
                                    '結果発表！' :
                                    <>
                                        {questionCounter === getData.length - 2 ?
                                            '最終問題へ' : '次へ'
                                        }
                                    </>
                                }
                            </button>
                        </li>
                    </ol>
                </div>
            }
        </>
    );
});