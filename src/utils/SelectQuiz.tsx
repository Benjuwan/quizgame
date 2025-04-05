import { memo, SyntheticEvent, use, useContext } from "react";
import { SelectQuizContext } from "../providers/SelectQuizContext";
import { selectQuizType } from "../ts/typeQuiz";

export const SelectQuiz = memo(({ fetchSelectQuizDataPromise }: { fetchSelectQuizDataPromise: Promise<selectQuizType[]> }) => {
    // use()でPromiseの中身を取得（Promiseが未完了ならこのコンポーネントはサスペンドする）
    const getSelectQuizData: selectQuizType[] = use(fetchSelectQuizDataPromise);

    const { setSelectQuiz } = useContext(SelectQuizContext);
    const handleSelect: (e: SyntheticEvent<HTMLSelectElement>) => void = (e: SyntheticEvent<HTMLSelectElement>) => {
        setSelectQuiz(e.currentTarget.value);
    }

    return (
        <select name="selectQuiz" id="selectQuiz" className="block w-fit my-[2.5em] mx-auto bg-[#fff] p-[1em] rounded" onChange={handleSelect}>
            <option>ここからクイズを選択</option>
            {getSelectQuizData.length > 0 &&
                <>
                    {getSelectQuizData.map((selectQuizData, i) => (
                        <option key={i} value={selectQuizData.value}>{selectQuizData.plainTxt}</option>
                    ))}
                </>
            }
        </select>
    );
});