import styled from "styled-components";
import { memo, SyntheticEvent, use, useContext } from "react";
import { quizType } from "../ts/typeQuiz";
import { QuestionCounterContext } from "../providers/QuestionCounterContext";
import { useChangeCorrectChoice } from "../hooks/useChangeCorrectChoice";

export const QuizContents = memo(({ fetchdataPromise }: { fetchdataPromise: Promise<quizType[]> }) => {
    // use()でPromiseの中身を取得（Promiseが未完了ならこのコンポーネントはサスペンドする）
    const getData: quizType[] = use(fetchdataPromise);

    const { questionCounter } = useContext(QuestionCounterContext);

    const { checkedEitherOf, changeCorrectChoice } = useChangeCorrectChoice();

    return (
        <>
            {questionCounter < getData.length &&
                <ContentView className="contentView">
                    {getData.map((quizData, i) => (
                        questionCounter === i ?
                            <div key={i} className='firstContents'>
                                <h2><span>設問：{i + 1}/{getData.length}</span>{quizData.quiz}</h2>
                                {quizData.imgsrc &&
                                    <p className="thumbnails"><img src={quizData.imgsrc} alt={`設問「${quizData.quiz}」を視覚的に表現した画像`} /></p>
                                }
                                <ul>
                                    {Object.entries(quizData.choices).map(choice => (
                                        <li key={choice[0]} className="labelItem">
                                            <label
                                                htmlFor={choice[0]}
                                                onClick={(e: SyntheticEvent<HTMLLabelElement>) => choice[1].adjust ?
                                                    changeCorrectChoice(
                                                        e.currentTarget,
                                                        choice[1].adjust
                                                    ) :
                                                    checkedEitherOf(e.currentTarget)}
                                            >
                                                <input
                                                    id={choice[0]}
                                                    type="radio"
                                                    name="quizChoices"
                                                    value={choice[1].point}
                                                />
                                                {choice[1].txt}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            : null
                    ))
                    }
                </ContentView>
            }
        </>
    );
});

const ContentView = styled.div`
    max-width: 800px;
    margin: 0 auto 40px;
    padding: 1.5em;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0,0,0,.45) inset;

    & h2{
        font-weight: normal;
        margin-bottom: 1em;
        padding: 1em;
        background-color: #dadada;
        border-radius: 4px;
        box-shadow: 0 0 4px #929292 inset;

        & span{
            font-size: 14px;
            font-weight: bold;
            display: block;
            border-bottom: 1px solid #333;
            margin-bottom: .75em;
        }
    }

    & .thumbnails{
        & img{
            display: block;
            width: clamp(120px, calc(100vw/2), 200px);
            margin: 1em auto;
        }
    }

    & .firstContents{
        &:not(:first-of-type){
            display: none;
        }
    }
    
    & ul{
        list-style: none;
        border-radius: 4px;

        & li{
            line-height: 1.75;
            &:where(:not(:last-of-type)){
                margin-bottom: 1em;
            }

            & input{
                margin: 0;
                display: inline-block;
                vertical-align: baseline;
            }
        }
    }


    @media screen and (min-width: 700px){
        & ul{
            padding-top: .5em;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            place-items: center;

            & li{
                margin-bottom: 0;
            }
        }
    }
`;