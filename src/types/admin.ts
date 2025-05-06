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
export type { Schedule, Classroom, Class, User }
