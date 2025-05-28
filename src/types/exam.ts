import { EnglishUser } from "./auth";

export interface Card {
    version: string;
    createdDate: number;
    lastModifiedDate: number;
    deleted: boolean;
    id: string;
    question: {
        image: string;
        hint: string;
        text: string;
        sound: string;
    };
    topicId: string;
    type: number
}

// Define the main structure
export interface ExamType {
    id: string;
    name: string;
    cardIds: string[];
    cards: Card[];
}

// Define the main structure
export interface QuizExamType {
    id: string;
    name: string;
    cardIds: string[];
    cards: MiniTestCardItem[];
}

export interface QuizExamReviewType {
    id: string;
    userResponse: EnglishUser;
    examResults: examResultType[]
};

export interface examResultType {
    resultId: string,
    score: number,
    listAnswer: string[]
};

export interface WritingFeedback {
    resultId: string;
    score: number;
    taskAchievement: number;
    coherence: number;
    lexicalResource: number;
    grammar: number;
    remarks: string;
    listAnswer: string[]
};

export interface ExamTestList {
    topicName: string;
    total: number;
    exams: {
        id: string,
        name: string,
        cards: string[],
        remarks: string,
        score: number,
        total: number,
        code: string,
    }[]
}

export interface MiniTestList {
    total: number;
    cards: MiniTestCardItem[];
}

export interface MiniTestCardItem extends MiniTestQuestionItem {
    isQuestionGroup: boolean,
    childCards?: MiniTestQuestionItem[]
    score?: number,
    code?: string,
    createdDate: number;

}

export interface MiniTestQuestionItem {
    id: string;
    index?: string;
    question: {
        image?: string;
        sound?: string;
        text?: string;
    },
    answer: {
        choices?: MiniTestChoiceItem[];
        text?: string;
    },
    type?: number;
}

export interface MiniTestChoiceItem {
    content: string,
    isCorrect: boolean
}

export interface UserAnswerItem {
    content: string,
    id: string
}

export interface UserAnswerList {
    [id: string]: string
}


export type QuestionList = {
    cards: {
        id: string,
        question: { sound: string, text: string, image: string },
        checked: boolean
    }[]
}

export type QuestionItemProps = Question & {
    onChange: (id: string, answer: string) => void;
    value?: string;
    isGroup?: boolean;
};

export type Question = {
    id: string;
    index?: string;
    questionTitle?: string;
    isFinish?: boolean;
    audioSrc?: string;
    imageSrc?: string;
    questionText?: string;
    answers: MiniTestChoiceItem[];
    correctAnswer?: string;
    selected?: string | null;
    type?: number;
};

export interface InvokeTimmer {
    invokeCountDown: () => void;
    forceFinish: () => void;
}
