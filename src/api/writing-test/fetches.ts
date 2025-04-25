import { ResponseData } from "@/types/api";
import { END_POINTS } from "../endpoint";
import { API } from "../fetch"
import { Example, WritingFeedback } from "@/types/exam";

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDU1NDUwNjIsImV4cCI6MTc0NjE0OTg2Mn0.MGgNR0faVocYz_rvB2FNRhFyd8Pz791im6u0T9GEVtHGx0XifTSMGs4xw9GIwLciheSmodhAHeTIdhHfurhQ2Q'
export const getWritingTest = (id = '680939fa6ca0ae13fc78f963'): Promise<ResponseData<Example>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_WRITING_TEST}/${id}`).addToken(token).get().then(res => res.json());
}

export const submitWritingTest = (content: string): Promise<ResponseData<WritingFeedback>> => {
    return fetch(END_POINTS.SUBMIT_WRITING_TEST, {
        method: 'POST', headers: {
            authorization: `Bearer ${token}`
        },
        body: content
    }).then(res => res.json())
}