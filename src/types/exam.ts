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

export type { Example }