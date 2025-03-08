import styled from "styled-components";
import { memo, SyntheticEvent } from "react";

export const SelectQuiz = memo(({ setSelectQuiz }: { setSelectQuiz: React.Dispatch<React.SetStateAction<string>> }) => {
    const handleSelect: (e: SyntheticEvent<HTMLSelectElement>) => void = (e: SyntheticEvent<HTMLSelectElement>) => {
        setSelectQuiz(e.currentTarget.value);
    }

    return (
        <SelectQuizElm name="selectQuiz" id="selectQuiz" onChange={handleSelect}>
            <option value="hoge">hoge</option>
            <option value="foo">foo</option>
            <option value="bar">bar</option>
            <option value="piyo">piyo</option>
            <option value="fuga">fuga</option>
        </SelectQuizElm>
    );
});

const SelectQuizElm = styled.select`
display: block;
width: fit-content;
margin: auto;
`;