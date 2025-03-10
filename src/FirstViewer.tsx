import styled from "styled-components";
import { memo, useContext } from "react";
import { SelectQuizContext } from "./providers/SelectQuizContext";
import { SelectQuiz } from "./SelectQuiz";
import { FetchDataAndLoading } from "./FetchDataAndLoading";

export const FirstViewer = memo(() => {
    const { selectQuiz } = useContext(SelectQuizContext);

    return (
        <FirstViewerElm>
            <div className="mainContainer">
                {selectQuiz.length === 0 &&
                    <div className="description">
                        <h1>─ 俺TUEEE ─</h1>
                        <p><span>誰でも満点（全問正解できる）</span>というコンセプトのクイズゲームです。<br />常に全問正答して<span>俺TUEEE（おれつえええ）という無双状態を体感</span>し、<br /><span>自己肯定感を好きなだけ爆上げ</span>してください。</p>
                        <SelectQuiz />
                    </div>
                }
                <FetchDataAndLoading />
            </div>
        </FirstViewerElm>
    );
});

const FirstViewerElm = styled.main`
margin: 2.5em auto calc(100vw/4);

    & .mainContainer{
        padding: 2em 2.5em calc(100vw/4);

        & .description{
            width: clamp(240px, 100%, 800px);
            margin: 0 auto 56px;
            font-size: 16px;
            line-height: 1.8;
            
            & h1{
                font-size: clamp(18px, calc(100vw/20), 40px);
                text-align: center;
                background-color: #747474;
                color: #fff;
                border-radius: 4px 4px 0 0;
            }
            
            & p{
                border-radius: 0 0 4px 4px;
                background-color: #dadada;
                padding: 1em;

                & span{
                    background: linear-gradient(to bottom, rgba(255,225,225,0) 70%, gold 30%);
                }
            }
        }
    }

@media screen and (min-width: 700px){
    & .mainContainer{
        padding: 2.5em;

        & .description{
            text-align: center;
            letter-spacing: .15em;
        }
    }
}
`;