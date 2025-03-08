import styled from "styled-components";
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
                <ProgressBar id="progressBar">
                    <ul>
                        {getData.map((_, i) => (
                            <li key={i}
                                className={i <= questionCounter ? 'cleared' : ''}
                            >&nbsp;</li>
                        ))}
                    </ul>
                </ProgressBar>
            }
        </>
    );
});

const ProgressBar = styled.div`
width: clamp(80px, calc(100vw/2), 800px);
margin: 0 auto 20px;

& ul{
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 2%;

    & li{
        border-radius: 30px;
        width: 64px;
        height: 12px;
        background-color: #dadada;

        &:first-of-type{
            background-color: gold;
        }

        &.cleared{
            background-color: gold;
        }
    }
}
`;