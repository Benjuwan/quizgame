import { memo, Suspense, useContext, useMemo } from "react";
import { selectQuizDefaultValue } from "./common/isDeploy";
import { SelectQuizContext } from "./providers/SelectQuizContext";
import { quizType } from "./ts/typeQuiz";
import { Loading } from "./common/loading";
import { QuizWrapper } from "./utils/QuizWrapper";

// questionCounter（ContextAPI：グローバルステート）更新に伴う再レンダリング防止措置で memo 化処理
export const FetchDataAndLoading = memo(() => {
    const { selectQuiz } = useContext(SelectQuizContext);

    const dynamicFetchPathUrl: string = `${selectQuiz.length !== 0 ? selectQuiz : selectQuizDefaultValue}/quiz.json`;
    const fetchPathUrl: string = `${import.meta.env.VITE_FETCH_URL}/jsons/quiz/${dynamicFetchPathUrl}`;

    /**
     * ※ await はしない。Promise を返す記述にする。Promise が未完了ならサスペンド状態となる
     * （Suspense の fallback が返る） 
     * ※ async / await を使った実装もできるが、その場合は非同期関数の実行という工程を挟むことになるため冗長なコードになる
     * （関数の処理結果を変数に格納して `use`API に渡す、または `use(asyncFunc())` というように関数（`asyncFunc()`）自体を渡す必要が出てくるため）
     * `useMemo`でレンダリングコストを削減
    */
    const fetchdataPromise: Promise<quizType[]> = useMemo(() => fetch(fetchPathUrl).then(res => res.json()), [fetchPathUrl]);

    if (selectQuiz.length === 0) {
        return;
    }

    return (
        <section className="text-[1rem] leading-[2]">
            {/* Suspense 必須 */}
            <Suspense fallback={<Loading />}>
                <QuizWrapper fetchdataPromise={fetchdataPromise} />
            </Suspense>
        </section>
    );
});