import styled from "styled-components";
import { memo } from "react";

export const Header = memo(() => {
    return (
        <HeaderElm>
            <h1>誰でも満点！？ 俺TUEEE</h1>
        </HeaderElm>
    );
});

const HeaderElm = styled.header`
padding-top: 2.5em;
margin-bottom: 1em;

    & h1{
        margin: auto;
        text-align: center;
    }
`;