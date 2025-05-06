import { ResponseData } from "@/types/api";
import { END_POINTS } from "../endpoint";
import { API } from "../fetch";
import { Class } from "@/types/admin";

export const getAllClass = (): Promise<ResponseData<Class>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_ALL_CLASS}`).get().then(res => res.json());
}

export const getQuestionByTopicId = (topicId: string): Promise<ResponseData<{
    cards: {
        id: string,
        question: { sound: string, text: string, image: string }
    }[]
}>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_QUESTIONS}?topicIds=${topicId}`).get().then(res => res.json());
}