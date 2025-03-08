import styled from "styled-components";
import { memo, Suspense } from "react";
import { fetchUrlPath_forDeploy, isDeploy } from "./common/isDeploy";
import { quizType } from "./ts/typeQuiz";
import { Loading } from "./common/loading";
import { QuizProgressBar } from "./utils/QuizProgressBar";
import { QuizContents } from "./utils/QuizContents";
import { QuizBtn } from "./utils/QuizBtn";
import { ViewAnswers } from "./utils/ViewAnswers";

// questionCounter（ContextAPI：グローバルステート）更新に伴う再レンダリング防止措置で memo 化処理
export const FetchDataAndLoading = memo(({ selectQuiz }: { selectQuiz: string }) => {
    console.log(selectQuiz);

    const fetchPathUrl: string = isDeploy ? `${fetchUrlPath_forDeploy}/quiz.json` : `${location.origin}/public/jsons/quiz.json`;

    // ※ await はしない。Promise を返す記述にする。Promise が未完了ならサスペンド状態となる（Suspense の fallback が返る） 
    const fetchdataPromise: Promise<quizType[]> = fetch(fetchPathUrl).then(res => res.json());

    return (
        <>
            {selectQuiz.length > 0 &&
                <QuizComponent>
                    <Suspense fallback={<Loading />}>
                        <QuizProgressBar fetchdataPromise={fetchdataPromise} />
                        <QuizContents fetchdataPromise={fetchdataPromise} />
                        <QuizBtn fetchdataPromise={fetchdataPromise} />
                        <ViewAnswers fetchdataPromise={fetchdataPromise} />
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