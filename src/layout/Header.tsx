import styled from "styled-components";
import { memo } from "react";

import rogo from "../assets/dareore.svg";

export const Header = memo(() => {
    return (
        <HeaderElm>
            <h1><img src={rogo} alt="誰でも100点!? 俺TUEEE" /></h1>
        </HeaderElm>
    );
});

const HeaderElm = styled.header`
padding-top: 2.5em;
margin-bottom: 1em;

    & h1{
        margin: auto;
        text-align: center;

        & img {
            width: clamp(.8rem, calc(100vw/2), 24rem);
        }
    }

@media screen and (min-width: 700px){
    & h1{
        & img {
            width: clamp(80px, 100%, 240px);
        }
    }
}
`;