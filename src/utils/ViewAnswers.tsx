import { memo, use, useContext, useMemo } from "react";
import { FetchAnswersDataContext } from "../providers/GetFetchAnswersDataContext";
import { answerResultType, quizType, yourAnsweredType } from "../ts/typeQuiz";
import { useViewQuizAndAnswers } from "../hooks/answers/useViewQuizAndAnswers";
import styled from "styled-components";

const TheCommonContent = ({ answer, isSingleComments }: {
    answer: answerResultType,
    isSingleComments: boolean
}) => {
    return (
        <>
            <h2>{answer.title}</h2>
            {answer.img &&
                <div className="thumbnails">
                    <img src={answer.img} alt={`「${answer.title}」の参照画像`} />
                </div>
            }
            <p>{answer.txt}</p>
            {/* コメント（所感）が複数ある場合 */}
            {isSingleComments ||
                <>{answer.comment && <p>{answer.comment}</p>}</>
            }
        </>
    );
}

export const ViewAnswers = memo(({ fetchdataPromise }: { fetchdataPromise: Promise<quizType[]> }) => {
    // use()でPromiseの中身を取得（Promiseが未完了ならこのコンポーネントはサスペンドする）
    const getData: quizType[] = use(fetchdataPromise);

    const { fetchAnswersData, scoreChecker } = useContext(FetchAnswersDataContext);

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
        <ViewAnswersElm>
            {(typeof scoreChecker !== 'undefined' && fetchAnswersData.length > 0) ?
                <div className="resultViewTxt">
                    <h2>得点：{scoreChecker.score}</h2>
                    {/* コメント（所感）が一つだけの場合 */}
                    {isSingleComments &&
                        <div className="resultViewSentence">
                            {fetchAnswersData[0].comment && <p>{fetchAnswersData[0].comment}</p>}
                        </div>
                    }
                    {typeof viewQuizAndAnswers !== 'undefined' && viewQuizAndAnswers.length > 0 &&
                        <details className="viewQuizAndAnswers">
                            <summary>自分の回答を確認する</summary>
                            <ul className="viewQuizAndAnswersChild">
                                {viewQuizAndAnswers.map(viewQuizAndAnswer => (
                                    <li key={viewQuizAndAnswer.questionNumber}>
                                        <p>
                                            <span>
                                                質問 {viewQuizAndAnswer.questionNumber}
                                                {viewQuizAndAnswer.score.length > 0 &&
                                                    <> ／ 得点 {viewQuizAndAnswer.score}</>
                                                }
                                            </span>
                                            {viewQuizAndAnswer.question}
                                        </p>
                                        <p><span className="answered">回答：</span>{viewQuizAndAnswer.answered}</p>
                                        <p><span className="correctAnswer">正答：</span>{viewQuizAndAnswer.correctAnswer}</p>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    }
                    <div id="resultChild" className="addFlex">
                        {fetchAnswersData.map((answer, i) => (
                            <div className="resEls" key={i}>
                                {answer.url ?
                                    <a href={answer.url} target="_blank">
                                        <TheCommonContent
                                            answer={answer}
                                            isSingleComments={isSingleComments}
                                        />
                                    </a> :
                                    <TheCommonContent
                                        answer={answer}
                                        isSingleComments={isSingleComments}
                                    />
                                }
                            </div>
                        ))}
                    </div>
                    <button id="resetBtn" type="button" onClick={resetBtn}>最初からやり直す</button>
                </div>
                : null
            }
        </ViewAnswersElm>
    );
});

const ViewAnswersElm = styled.div`
    .resultViewTxt{
        width: clamp(280px, 100%, 640px);
        margin: 0 auto;
        padding: 2.5em;
        background-color: #dadada;
        border-radius: 4px;

        & h2{
            text-align: center;
            font-size: clamp(24px, calc(100vw/24), 32px);
            font-weight: normal;
            margin-bottom: 1em;
        }

        & #wikiTxt{
            width: 100%;
            font-style: italic;
            font-size: 1.2rem;
            line-height: 1.8;
            margin-bottom: 8px;
        }
        
        .viewQuizAndAnswers {
            margin: 2.5em auto;
            font-size: 1.4rem;

            & summary{
                background-color: #333;
                color: #fff;
                border: 1px solid transparent;
                line-height: 2;
                width: fit-content;
                padding: 0 1em;
                letter-spacing: 0.25em;
                cursor: pointer;

                &:hover{
                    transition: all .25s;
                    background-color: #fff;
                    color: #333;
                }
            }
            
            & .viewQuizAndAnswersChild{
                font-size: 1.6rem;
                padding: 1em;
                box-shadow: 0 0 8px rgba(0,0,0,.45) inset;
                border-radius: 4px;
                list-style: none;

                & li{
                    line-height: 1.5;

                    & p {
                        padding-left: 1em;

                        & span {
                            display: block;
                            text-indent: -1em;
                            font-weight: bold;

                            &.answered{
                                color: #196cca;
                            }
                            
                            &.correctAnswer{
                                color: #158815;
                            }
                        }
                    }

                    &:not(:last-of-type){
                        border-bottom: 1px solid #333;
                        margin-bottom: 1em;
                        padding-bottom: 1em;
                    }
                }
            }
        }

        .resEls{
            font-size: 1.4rem;
            color: #333;
            line-height: 1.8;
            border-radius: 4px;
            box-shadow: 0 0 16px rgba(0,0,0,.45) inset;
            margin-bottom: 80px;
            padding: 1.5em;
            
            & h2{
                text-align: left;
                font-size: 1.8rem;
                border-left: 8px solid;
                padding-left: .5em;
                margin-bottom: 2em;
                line-height: 1.5;
            }
            
            & p{
                overflow-wrap: anywhere;
            }

            & .thumbnails{
                height: clamp(460px, calc(100vw/2), 640px);
                margin-bottom: 2em;
                
                & img{
                    object-fit: contain;
                    width: 100%;
                    height: 100%;
                }
            }
            
            & a{
                display: block;
                text-decoration: none;
                color: #333;
            }

            &:not(.noImgAnker, .noAnker):hover {
                transition: all .5s;
                box-shadow: 0 0 16px rgba(0,0,0,.45);
            }

            &.noImgAnker,
            &.noAnker {
                padding: 1.5em;
            }
        }

        & #resetBtn{
            appearance: none;
            border: none;
            outline: none;
            cursor: pointer;
            display: block;
            width: clamp(80px, calc(100vw/2),320px);
            margin: 0 auto 40px;
            line-height: 44px;
            background-color: #333;
            border: 1px solid transparent;
            color: #fff;
            letter-spacing: .25em;

            &:hover{
                transition: all .5s;
                border-color: #333;
                color: #333;
                background-color: #fff;
            }
        }

        & .resultViewSentence{
            & p{
                font-size: 16px;
                line-height: 1.8;
                margin-bottom: 2em;
            }
        }
    }

@media screen and (min-width: 700px) {
    #resultChild{
        max-width: 640px;
        margin: auto;

        &.addFlex{
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 2em;

            & .resEls{
                width: 100%;
                &:not(:last-of-type){
                    margin-bottom: 2%;
                }
            }
        }

        & .resEls{
            font-size: 16px;

            & h2{
                font-size: 18px;
            }

            & .thumbnails{
                height: clamp(160px, calc(100vw/5), 280px);
                margin-bottom: 20px;
            }
        }
    }

    .resultViewTxt{
        & h2{
            font-size: 32px;
        }

        & #wikiTxt{
            font-size: 12px;
        }

        & .viewQuizAndAnswers {
            font-size: 14px;

            & .viewQuizAndAnswersChild {
                font-size: 16px;
            }
        }
    }  
}

@media screen and (min-width: 1025px){
    #resultChild{
        max-width: 1080px;

        &.addFlex{
            justify-content: flex-start;

            & .resEls{
                &:not(:last-of-type){
                    margin-bottom: 80px;
                }
            }
        }
    }

    .resultViewTxt{
        width: clamp(280px,100%,1080px);
        padding: 24px;
    }
}
`;