import { ResponseData } from "@/types/api";
import { END_POINTS } from "../endpoint";
import { API } from "../fetch";
import { Class, User } from "@/types/admin";
import { QuestionList } from "@/types/exam";

export const getAllClass = (): Promise<ResponseData<Class>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_ALL_CLASS}`).get().then(res => res.json());
}

export const getQuestionByTopicId = (topicId: string): Promise<QuestionList> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_QUESTIONS}?topicIds=${topicId}`).get().then(res => res.json());
}

export const createExam = (body: {
    name: string;
    topicId: string;
    classroomId: string;
    cardIds: string[];
}): Promise<ResponseData<boolean>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.CREATE_EXAM}`).post(body).then(res => res.json());
}

export const getUserInClass = (classId: string): Promise<{total: number, users: User[]}> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_USER_IN_CLASS}&classroomId=${classId}`).get().then(res => res.json());
} 