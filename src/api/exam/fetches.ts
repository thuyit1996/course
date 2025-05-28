import { ResponseData } from "@/types/api";
import { END_POINTS } from "../endpoint";
import { API } from "../fetch"
import { ExamType, MiniTestList, WritingFeedback, ExamTestList, QuizExamType, QuizExamReviewType } from "@/types/exam";
import { Topic } from "@/types/admin";

// Mini-test

export const getMiniTest = (id: string): Promise<ResponseData<ExamType>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_MINI_TEST}/${id}`).get().then(res => res.json());
}

export const getMiniTestList = async (): Promise<ResponseData<MiniTestList>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_MINI_TEST}`).get().then(res => res.json());
}

export const submitMiniTest = (examId: string, content: string): Promise<ResponseData<WritingFeedback>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.SUBMIT_WRITING_TEST}`).post({
        examId,
        essay: content
    }).then(res => res.json());
}

// Quiz test

export const getQuizTestList = async (): Promise<ResponseData<ExamTestList>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_ALL_QUIZ_TEST}`).get().then(res => res.json());
}

export const getQuizExamTest = (id: string): Promise<ResponseData<QuizExamType>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_EXAM_TEST}/${id}`).get().then(res => res.json());
}

export const getQuizExamHistoryDetail = async (examId: string, userId: string): Promise<ResponseData<QuizExamReviewType>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_HISTORY}?resultId=${examId}&userId=${userId}`).get().then(res => res.json());
}

export const submitQuizTest = (params: {
    examId: string,
    listAnswers: string[],
    score: number,
    remarks?: string,
    userId: string,
}) => {
    const api = new API();
    return api.addPathName(`${END_POINTS.SUBMIT_QUIZ_TEST}`).post({
        ...params,
    }).then(res => res.json());
}

// Writing test
export const getExamTest = (id: string): Promise<ResponseData<ExamType>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_EXAM_TEST}/${id}`).get().then(res => res.json());
}

export const submitWritingTest = (examId: string, content: string): Promise<ResponseData<WritingFeedback>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.SUBMIT_WRITING_TEST}`).post({
        examId,
        essay: content
    }).then(res => res.json());
}

export const getAllTopic = async (): Promise<ResponseData<{ id: string, name: string }[]>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_ALL_TOPIC}`).get().then(res => res.json());
}

export const getWritingTestList = async (): Promise<ResponseData<ExamTestList>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_ALL_WRITING_TEST}`).get().then(res => res.json());
}




export const getAllAdminTopic = async (): Promise<{ topics: Topic[] }> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_ALL_ADMIN_TOPIC}`).get().then(res => res.json());
}

export const createQuestion = async (body: Record<string, any>): Promise<ResponseData<boolean>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.CREATE_QUESTION}`).post(body).then(res => res.json());
}

export const getHistoryDetail = async (examId: string, userId: string): Promise<ResponseData<{
    examResults: WritingFeedback[]
}>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_HISTORY}?resultId=${examId}&userId=${userId}`).get().then(res => res.json());
}
export const uploadFile = async (formData: FormData): Promise<ResponseData<string>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.UPLOAD_FILE}`).postFile(formData).then(res => res.json());
}