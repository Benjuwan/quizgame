import styled from "styled-components";
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
        <SelectQuizElm name="selectQuiz" id="selectQuiz" onChange={handleSelect}>
            <option>ここからクイズを選択</option>
            {getSelectQuizData.length > 0 &&
                <>
                    {getSelectQuizData.map((selectQuizData, i) => (
                        <option key={i} value={selectQuizData.value}>{selectQuizData.plainTxt}</option>
                    ))}
                </>
            }
        </SelectQuizElm>
    );
});

const SelectQuizElm = styled.select`
display: block;
width: fit-content;
margin: 2.5em auto;
background-color: #fff;
padding: 1em;
border-radius: 4px;
`;