import styled from "styled-components";
import { memo, useMemo } from "react";

export const Footer = memo(() => {
    const currYear: number = useMemo(() => {
        const data: Date = new Date();
        return data.getFullYear();
    }, []);

    return (
        <FooterElm>
            <p><small>Copyright &copy; {currYear} QuizGame by <a href="https://github.com/benjuwan" target="_blank">benjuwan</a></small></p>
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
    margin-top: clamp(120px, calc(100vw/16), 240px);
}
`;