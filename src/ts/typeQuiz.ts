export type selectQuizType = {
    value: string;
    plainTxt: string;
};

type quizChoiceContentType = {
    txt: string;
    point: string;
    adjust?: string | string[];
};

/* 多くて8問程度だと想定 */
export type quizChoicesType = {
    one: quizChoiceContentType;
    two: quizChoiceContentType;
    three: quizChoiceContentType;
    four?: quizChoiceContentType;
    five?: quizChoiceContentType;
    six?: quizChoiceContentType;
    seven?: quizChoiceContentType;
    eight?: quizChoiceContentType;
};

export type quizType = {
    quiz: string;
    choices: quizChoicesType;
    imgsrc?: string;
};

export type quizCollectAnswerScoresType = {
    /* key（プロパティ名）は（オブジェクトの）ブラケット記法で（useSubscribeAnswers.ts で）動的に命名 */
    [choiceLabel: string]: string[];
};

export type answerResultType = {
    title: string;
    txt: string;
    url?: string;
    img?: string;
    comment?: string;
};

export type resultType = {
    score: number;
};

export type yourAnsweredType = {
    questionNumber: number;
    question: string;
    answered: string;
    correctAnswer: string;
    score: string;
};
