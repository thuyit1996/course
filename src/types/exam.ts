interface Card {
    version: string;
    createdDate: number;
    lastModifiedDate: number;
    deleted: boolean;
    id: string;
    question: {
        image: string;
        hint: string;
        text: string;
    };
    topicId: string;
}

// Define the main structure
interface Example {
    id: string;
    name: string;
    cardIds: string[];
    cards: Card[];
}


interface  WritingFeedback  {
    Overall_Band_Score: number;
    Task_Achievement: number;
    Coherence: number;
    Lexical_Resource: number;
    Grammar: number;
    Feedback: string;
  };

interface WritingTestList {
    topicName: string;
    total: number;
    exams: {
        id: string,
        name: string,
        cards: string[]
    }[]
}
export type { Example, WritingFeedback, WritingTestList }