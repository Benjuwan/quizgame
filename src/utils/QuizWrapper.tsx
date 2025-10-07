import { memo, use } from "react";
import { quizType } from "../ts/typeQuiz";
import { QuizProgressBar } from "./QuizProgressBar";
import { QuizContents } from "./QuizContents";
import { QuizBtnViewAnswerWrapper } from "./QuizBtnViewAnswerWrapper";

export const QuizWrapper = memo(({ fetchdataPromise }: { fetchdataPromise: Promise<quizType[]> }) => {
    // use()でPromiseの中身を取得（Promiseが未完了ならこのコンポーネントはサスペンドする）
    const getData: quizType[] = use(fetchdataPromise);

    return (
        <>
            <QuizProgressBar getData={getData} />
            <QuizContents getData={getData} />
            <QuizBtnViewAnswerWrapper getData={getData} />
        </>
    );
});