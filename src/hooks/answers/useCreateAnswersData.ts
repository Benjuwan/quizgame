import { useContext } from "react";
import { FetchAnswersDataContext } from "../../providers/GetFetchAnswersDataContext";
import { answerResultType } from "../../ts/typeQuiz";
import { fetchUrlPath_forDeploy, isDeploy } from "../../common/isDeploy";

export const useCreateAnswersData = () => {
    const { setFetchAnswersData } = useContext(FetchAnswersDataContext);

    const createAnswersData: (urlPathPart: string) => void = async (urlPathPart: string) => {
        const fetchUrlPath: string = isDeploy ? `${fetchUrlPath_forDeploy}/answers/${urlPathPart}` : `${location.origin}/public/jsons/answers/${urlPathPart}`;

        const response = await fetch(fetchUrlPath, { cache: 'no-store' });
        const answers: answerResultType[] = await response.json();

        setFetchAnswersData(answers);
    }

    return { createAnswersData }
}
