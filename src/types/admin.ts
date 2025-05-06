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
export type { Schedule, Classroom, Class }
