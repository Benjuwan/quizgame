import styled from "styled-components";
import { memo, SyntheticEvent } from "react";
import { selectQuizDefaultValue } from "./common/isDeploy";

export const SelectQuiz = memo(({ setSelectQuiz }: { setSelectQuiz: React.Dispatch<React.SetStateAction<string>> }) => {
    const handleSelect: (e: SyntheticEvent<HTMLSelectElement>) => void = (e: SyntheticEvent<HTMLSelectElement>) => {
        setSelectQuiz(e.currentTarget.value);
    }

    return (
        <SelectQuizElm name="selectQuiz" id="selectQuiz" onChange={handleSelect}>
            <option>ここからクイズを選択</option>
            <option value={selectQuizDefaultValue}>動物</option>
            <option value="geo">地理・自然</option>
            <option value="historical">歴史（世界史・日本史）</option>
            <option value="web-front">webサイト制作関連</option>
            <option value="lifehack">ライフハック</option>
        </SelectQuizElm>
    );
});

const SelectQuizElm = styled.select`
display: block;
width: fit-content;
margin: auto;
`;