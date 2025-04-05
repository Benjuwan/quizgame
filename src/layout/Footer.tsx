import { memo, useMemo } from "react";

export const Footer = memo(() => {
    const currYear: number = useMemo(() => {
        const data: Date = new Date();
        return data.getFullYear();
    }, []);

    return (
        <footer className="text-[0.75rem] text-center leading-[2] md:mt-[clamp(160px,calc(100vw/5),320px)]">
            <p><small>Copyright &copy; {currYear} <a href="https://github.com/Benjuwan/quizgame" target="_blank">QuizGame by benjuwan</a></small></p>
        </footer>
    );
});