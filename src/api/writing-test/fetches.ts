import { ResponseData } from "@/types/api";
import { END_POINTS } from "../endpoint";
import { API } from "../fetch"
import { Example } from "@/types/exam";

export const getWritingTest = (id = '680939fa6ca0ae13fc78f963'): Promise<ResponseData<Example>> => {
    const api = new API();
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDU0ODI2NzcsImV4cCI6MTc0NjA4NzQ3N30.CX5YXlfL6wKV5OidUAZARQ2tZXZW8sxneLYHItcRCjD73IE1z47EcKsq6HDq2tFi6WoWtgbole-arrPr6Ffxyg';
    return api.addPathName(`${END_POINTS.GET_WRITING_TEST}/${id}`).addToken(token).get().then(res => res.json());
}