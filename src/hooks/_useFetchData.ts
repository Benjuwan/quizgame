import { useState } from "react"
import { quizType } from "../ts/typeQuiz";
import { selectQuizDefaultValue } from "../common/isDeploy";

export const useFetchData = () => {
    // const { setFetchData } = useContext(FetchDataContext);

    /* React19 以前では上記のように ContextAPI や状態管理ライブラリ（例：jotai）を用いるなどしてフェッチデータをグローバルステートとして扱う必要がある。※ContextAPI を用いる場合は当該 Context.Provider の用意も必要 */
    const [fetchData, setFetchData] = useState<quizType[]>([]);

    const fetchDataAction: (selectQuiz: string) => Promise<void> = async (selectQuiz: string) => {
        try {
            const dynamicFetchPathUrl: string = `${selectQuiz.length !== 0 ? selectQuiz : selectQuizDefaultValue}/quiz.json`;

            const fetchPathUrl: string = `${import.meta.env.VITE_FETCH_URL}/jsons/quiz/${dynamicFetchPathUrl}`;

            const res: Response = await fetch(fetchPathUrl, {
                cache: 'no-store'
            });

            if (!res.ok) {
                throw new Error(`status is ${res.status} | fetch failed.`);
            }

            const contentType: string | null = res.headers.get('content-type');
            // contentType が application/json ではない場合
            if (contentType !== null && !contentType.includes('application/json')) {
                throw new Error(`Expected JSON but got [${contentType}]`);
            }

            const resObj: quizType[] = await res.json();
            setFetchData(resObj);
        } catch (e: unknown) {
            // 型ガードで Error のハンドリング（※左辺オペランドが右辺オペランドのインスタンスであるかどうかを判定）
            if (e instanceof Error) {
                console.error(e.message);
                alert(`${e.message}\nページを再読み込みします`);
                location.reload();
            }
        }

        console.log(fetchData); // 確認用のログ出力：※処理には関係ない
    }

    return { fetchDataAction }
}