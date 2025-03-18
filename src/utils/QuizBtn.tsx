import styled from "styled-components";
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
                <ContentControler className="contentControler">
                    <ol>
                        <li><button id="backBtn" type="button" onClick={decrementAct} disabled={questionCounter === 0}>戻る</button></li>
                        <li>
                            <button id="nextBtn" type="button" onClick={increment} disabled={isBtnDisabled}>
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
                </ContentControler>
            }
        </>
    );
});

const ContentControler = styled.div`
    max-width: 800px;
    margin: auto;
        
        & ol{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            list-style: none;
            padding: 0;

            & li{
                justify-self: start;
                &:last-of-type{
                    justify-self: end;
                }
                
                & button{
                    appearance: none;
                    outline: none;
                    padding: 0 2.5em;
                    line-height: 44px;
                    border-radius: 4px;
                    color: #333;
                    background-color: gold;
                    border-color: transparent;
                    
                    &[disabled]{
                        background-color: #dadada;
                        color: #a0a0a0;
                    }
                    
                    &:not([disabled]):hover{
                        cursor: pointer;
                        transition: all .25s;
                        background-color: #fff4b6;
                    }
                }
            }
        }
`;