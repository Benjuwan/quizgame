import { useContext } from "react";
import { BtnDisabledContext } from "../providers/BtnDisabledContext";

export const useChangeCorrectChoice = () => {
    const { isBtnDisabled, setBtnDisabled } = useContext(BtnDisabledContext);

    /* 選択肢が間違った回答かどうかをチェック */
    const _hasNGwordSelectedChoice: (targetElm: HTMLElement | HTMLInputElement, adjustWord: string) => void = (
        targetElm: HTMLElement | HTMLInputElement,
        adjustWord: string
    ) => {
        targetElm.textContent = adjustWord;
    }

    /* 次の問題に進めるかチェック */
    const checkedEitherOf: (targetElm: HTMLLabelElement) => void = (targetElm: HTMLLabelElement) => {
        let isCheckedEitherOf: boolean = false;

        const choices: HTMLInputElement | null | undefined = targetElm.querySelector('input');
        if (typeof choices !== 'undefined' && choices !== null) {
            choices.setAttribute('checked', 'true');
            isCheckedEitherOf = choices.hasAttribute('checked');
        }

        /* 解答欄のいずれかがチェックされている場合のみ次の問題に進める */
        if (isCheckedEitherOf && isBtnDisabled) {
            setBtnDisabled(false);
        }
    }

    const changeCorrectChoice: (targetElm: HTMLLabelElement, adjust?: string | string[]) => void = (
        targetElm: HTMLLabelElement,
        adjust?: string | string[]
    ) => {
        if (typeof adjust === 'undefined') {
            checkedEitherOf(targetElm);
            return;
        }

        /* adjust（調整ワード）が複数ある（string[]）場合はランダム表示 */
        const adjustWord: string = typeof adjust === 'string' ? adjust : adjust[Math.floor(Math.random() * adjust.length)];
        _hasNGwordSelectedChoice(targetElm, adjustWord);
    }

    return { checkedEitherOf, changeCorrectChoice }
}