import { ResponseData } from "@/types/api";
import { END_POINTS } from "../endpoint";
import { API } from "../fetch";
import { Class, Exam, User } from "@/types/admin";
import { QuestionList } from "@/types/exam";

export const getAllClass = (): Promise<ResponseData<Class>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_ALL_CLASS}`).get().then(res => res.json());
}

export const getQuestionByTopicId = (topicIds: string[]): Promise<QuestionList> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_QUESTIONS}?topicIds=${topicIds}`).get().then(res => res.json());
}

export const createExam = (body: {
    name: string;
    topicIds: string[];
    classroomId: string;
    cardIds: string[];
}): Promise<ResponseData<boolean>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.CREATE_EXAM}`).post(body).then(res => res.json());
}

export const getUserInClass = (classId: string): Promise<{total: number, users: User[]}> => {
    console.log(classId);
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_USER_IN_CLASS}&classroomIds=${classId}`).get().then(res => res.json());
}

export const getExams = (): Promise<{total: number, exams: Exam[]}> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_EXAMS}`).get().then(res => res.json());
} 