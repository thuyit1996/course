type Schedule = {
    day: string;
    time: string[];
};

type Classroom = {
    id: string;
    name: string;
    schedule: Schedule[];
};

type Class = {
    total: number;
    classroom: Classroom[];
};

type User = {
    userId: string;
    displayName: string;
    firstName: string;
    lastName: string;
    roles: string[]; // Assuming roles is an array of strings
    email: string;
    address: string;
    phone: string;
}

interface Creator {
    userId: string;
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
}

interface Exam {
    id: string;
    name: string;
    code: string;
    creator: Creator;
    cardIds: string[];
    createdDate: number;
    lastModifiedDate: number;
    classroomName: string;
}

interface Topic {
    id: string,
    name: string,
    creator: User,
    "createdDate": number,
    "lastModifiedDate": number
}


interface Question {
    sound: string;
    image: string;
    text: string;
}

interface Answer {
    text: string;
}

interface Creator {
    userId: string;
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
}

interface QuestionItem {
    id: string;
    question: Question;
    answer: Answer;
    type: string;
    creator: Creator;
    createdDate: number;
    lastModifiedDate: number;
    childCards: any[]
}

export type { Schedule, Classroom, Class, User, Exam, Topic, QuestionItem }
