import styled from "styled-components";
import { memo, useMemo } from "react";

export const Footer = memo(() => {
    const currYear: number = useMemo(() => {
        const data: Date = new Date();
        return data.getFullYear();
    }, []);

    return (
        <FooterElm>
            <p><small>Copyright &copy; {currYear} <a href="https://github.com/Benjuwan/quizgame" target="_blank">QuizGame by benjuwan</a></small></p>
        </FooterElm>
    );
});

const FooterElm = styled.footer`
& p {
    font-size: 12px;
    text-align: center;
    line-height: 2;
}

@media screen and (min-width: 700px){
    margin-top: clamp(160px, calc(100vw/5), 320px);
}
`;