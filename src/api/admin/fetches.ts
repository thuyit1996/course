import { ResponseData } from "@/types/api";
import { END_POINTS } from "../endpoint";
import { API } from "../fetch";
import { Class, Exam, QuestionItem, Topic, User } from "@/types/admin";
import { QuestionList } from "@/types/exam";

export const getAllClass = (params = {}): Promise<ResponseData<Class>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_ALL_CLASS}`).addQueryParams(params).get().then(res => res.json());
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

export const getUserInClass = (params: Record<string, string>): Promise<{ total: number, users: User[] }> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_USER_IN_CLASS}`).addQueryParams(params).get().then(res => res.json());
}

export const getExams = (params: Record<string, string>): Promise<{ total: number, exams: Exam[] }> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_EXAMS}`).addQueryParams(params).get().then(res => res.json());
}


export const getTopics = (params: Record<string, string>): Promise<{ total: number, topics: Topic[] }> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_TOPICS}`).addQueryParams(params).get().then(res => res.json());
}

export const getQuestions = (params: Record<string, string>): Promise<{ total: number, cards: QuestionItem[] }> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_QUESTIONS}`).addQueryParams(params).get().then(res => res.json());
}

export const getTeachers = (params: Record<string, string>): Promise<{ total: number, users: User[] }> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_TEACHERS}`).addQueryParams(params).get().then(res => res.json());
}


export const getStaff = (params: Record<string, string>): Promise<{ total: number, users: User[] }> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_STAFF}`).addQueryParams(params).get().then(res => res.json());
}

export const createUser = (body: any) => {
    const api = new API();
    return api.addPathName(`${END_POINTS.REGISER_USER}`).post(body).then(res => res.json());
}


export const verifyUser = (params: any): Promise<ResponseData<boolean>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.VERIFY_USER}`).addQueryParams(params).post().then(res => res.json());
} 
