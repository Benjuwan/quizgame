import { useState } from "react"
import { quizType } from "../ts/typeQuiz";
import { fetchUrlPath_forDeploy, isDeploy } from "../common/isDeploy";

export const useFetchData = () => {
    // const { setFetchData } = useContext(FetchDataContext);

    /* React19 以前では上記のように ContextAPI や状態管理ライブラリ（例：jotai）を用いるなどしてフェッチデータをグローバルステートとして扱う必要がある。※ContextAPI を用いる場合は当該 Context.Provider の用意も必要 */
    const [fetchData, setFetchData] = useState<quizType[]>([]);

    const fetchDataAction = async () => {
        try {
            const fetchPathUrl: string = isDeploy ? `${fetchUrlPath_forDeploy}/quiz.json` : `${location.origin}/public/jsons/quiz.json`;

            const res: Response = await fetch(fetchPathUrl, {
                cache: 'no-store'
            });

            if (!res.ok) {
                throw new Error(`status is ${res.status} | fetch failed.`);
            }

            const resObj: quizType[] = await res.json();
            setFetchData(resObj);
        } catch (e: unknown) {
            // 型ガードで Error のハンドリング（※左辺オペランドが右辺オペランドのインスタンスであるかどうかを判定）
            if (e instanceof Error) {
                console.error(e.message);
            }
        }

        console.log(fetchData); // 確認用のログ出力：※処理には関係ない
    }

    return { fetchDataAction }
}