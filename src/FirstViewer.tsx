import { memo, Suspense, useContext } from "react";
import { SelectQuizContext } from "./providers/SelectQuizContext";
import { selectQuizType } from "./ts/typeQuiz";
import { SelectQuiz } from "./utils/SelectQuiz";
import { FetchDataAndLoading } from "./FetchDataAndLoading";

export const FirstViewer = memo(() => {
    const { selectQuiz } = useContext(SelectQuizContext);

    // クイズゲームの選択肢シートのフェッチ処理
    const fetchSelectQuizPathUrl: string = `${import.meta.env.VITE_FETCH_URL}/jsons/select-quiz.json`;

    // ※ await はしない。Promise を返す記述にする。Promise が未完了ならサスペンド状態となる（Suspense の fallback が返る） 
    const fetchSelectQuizDataPromise: Promise<selectQuizType[]> = fetch(fetchSelectQuizPathUrl).then(res => res.json());

    return (
        <main className="mt-[2.5em] mx-auto mb-[calc(100vw/4)] md:mb-[2.5em]">
            <div className="py-[2.5em] px-[1em] md:p-[2.5em]">
                {selectQuiz.length === 0 &&
                    <div className="w-[clamp(15rem,100%,50rem)] mt-[0] mx-auto mb-[3.5rem] text-[1rem] leading-[1.8] md:text-center md:tracking-[0.15em]">
                        <h2 className="text-[clamp(1.125rem,calc(100vw/20),2.5rem)] text-center bg-[#747474] text-[#fff] rounded rounded-b-none rounded-l-none">─ 誰でも100点!? 俺TUEEE ─</h2>
                        <div className="rounded rounded-t-none rounded-r-none bg-[#dadada] p-[1em]">
                            <p><span className="bg-[linear-gradient(to_bottom,rgba(255,225,225,0)_70%,gold_30%)]">誰でも100点が取れる（全問正解できる）</span>というコンセプトのクイズゲームです。<br />常に全問正答して<span>俺TUEEE（おれつえええ）という無双状態を体感</span>し、<br /><span>自己肯定感を好きなだけ爆上げ</span>してください。</p>
                            <Suspense fallback={<p id="fetchSelectQuiz" className="text-center tracking-[0.25em] leading-[7]">選択肢取得中</p>}>
                                <SelectQuiz fetchSelectQuizDataPromise={fetchSelectQuizDataPromise} />
                            </Suspense>
                        </div>
                    </div>
                }
                <FetchDataAndLoading />
            </div>
        </main>
    );
});