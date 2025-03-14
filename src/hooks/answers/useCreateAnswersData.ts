import { useContext } from "react";
import { FetchAnswersDataContext } from "../../providers/GetFetchAnswersDataContext";
import { SelectQuizContext } from "../../providers/SelectQuizContext";
import { answerResultType } from "../../ts/typeQuiz";

export const useCreateAnswersData = () => {
    const { setFetchAnswersData } = useContext(FetchAnswersDataContext);
    const { selectQuiz } = useContext(SelectQuizContext);

    const createAnswersData: (urlPathPart: string) => void = async (urlPathPart: string) => {
        try {
            const fetchUrlPath: string = `${import.meta.env.VITE_FETCH_URL}/jsons/answers/${selectQuiz}/${urlPathPart}`;

            const response: Response = await fetch(fetchUrlPath, { cache: 'no-store' });

            if (!response.ok) {
                throw new Error(`createAnswersData：status / ${response.status} | fetch error occurred.`);
            }

            const contentType: string | null = response.headers.get('content-type');
            // contentType が application/json ではない場合
            if (contentType !== null && !contentType.includes('application/json')) {
                throw new Error(`Expected JSON but got [${contentType}]`);
            }

            const answers: answerResultType[] = await response.json();
            setFetchAnswersData(answers);
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e);
                alert(`${e.message}\nページを再読み込みします`);
                location.reload();
            }
        }
    }

    return { createAnswersData }
}