import styled from "styled-components";
import { memo, Suspense, useContext } from "react";
import { selectQuizDefaultValue } from "./common/isDeploy";
import { SelectQuizContext } from "./providers/SelectQuizContext";
import { quizType } from "./ts/typeQuiz";
import { Loading } from "./common/loading";
import { QuizProgressBar } from "./utils/QuizProgressBar";
import { QuizContents } from "./utils/QuizContents";
import { QuizBtnViewAnswerWrapper } from "./utils/QuizBtnViewAnswerWrapper";

// questionCounter（ContextAPI：グローバルステート）更新に伴う再レンダリング防止措置で memo 化処理
export const FetchDataAndLoading = memo(() => {
    const { selectQuiz } = useContext(SelectQuizContext);

    const dynamicFetchPathUrl: string = `${selectQuiz.length !== 0 ? selectQuiz : selectQuizDefaultValue}/quiz.json`;

    const fetchPathUrl: string = `${import.meta.env.VITE_FETCH_URL}/jsons/quiz/${dynamicFetchPathUrl}`;

    // ※ await はしない。Promise を返す記述にする。Promise が未完了ならサスペンド状態となる（Suspense の fallback が返る） 
    const fetchdataPromise: Promise<quizType[]> = fetch(fetchPathUrl).then(res => res.json());

    return (
        <>
            {selectQuiz.length > 0 &&
                <QuizComponent>
                    {/* Suspense 必須 */}
                    <Suspense fallback={<Loading />}>
                        <QuizProgressBar fetchdataPromise={fetchdataPromise} />
                        <QuizContents fetchdataPromise={fetchdataPromise} />
                        <QuizBtnViewAnswerWrapper fetchdataPromise={fetchdataPromise} />
                    </Suspense>
                </QuizComponent>
            }
        </>
    );
});

const QuizComponent = styled.section`
& .contentsWrapper{
    font-size: 16px;
    line-height: 2;
}
`;