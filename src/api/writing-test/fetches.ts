import { ResponseData } from "@/types/api";
import { END_POINTS } from "../endpoint";
import { API } from "../fetch"
import { Example, WritingFeedback, WritingTestList } from "@/types/exam";

export const getWritingTest = (id: string): Promise<ResponseData<Example>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_WRITING_TEST}/${id}`).get().then(res => res.json());
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

export const getWritingTestList = async (topicId: string): Promise<ResponseData<WritingTestList>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_ALL_WRITING_TEST}/${topicId}`).get().then(res => res.json());
}

export const saveWritingTest = (body: {
    examId: string,
    listAnswers: string[],
    score: number,
    remarks: string,
    userId: string,
}) => {
    const api = new API();
    return api.addPathName(`${END_POINTS.SAVE_WRITING_TEST}`).post({
        ...body,
    }).then(res => res.json());
}


export const getAllAdminTopic = async (): Promise<{ topics: { id: string, name: string }[]}> => {
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