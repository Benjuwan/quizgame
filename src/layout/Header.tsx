import { memo } from "react";
import rogo from "../assets/dareore.svg";

export const Header = memo(() => {
    return (
        <header className="pt-[2.5em] mb-[1em]">
            <h1 className="m-auto text-center"><img className="w-[clamp(5rem,calc(100vw/2),15rem)] m-auto" src={rogo} alt="誰でも100点!? 俺TUEEE" /></h1>
        </header>
    );
});