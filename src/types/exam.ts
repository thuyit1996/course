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
    resultId: string;
    score: number;
    taskAchievement: number;
    coherence: number;
    lexicalResource: number;
    grammar: number;
    remarks: string;
  };

interface WritingTestList {
    topicName: string;
    total: number;
    exams: {
        id: string,
        name: string,
        cards: string[],
        remarks: string,
        score: number,
        total: number
    }[]
}
export type { Example, WritingFeedback, WritingTestList }