import { ResponseData } from "@/types/api";
import { END_POINTS } from "../endpoint";
import { API } from "../fetch"
import { Example, WritingFeedback, WritingTestList } from "@/types/exam";

// const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDU1NzE5NjksImV4cCI6MTc0NjE3Njc2OX0.zd82-U2bKqslWFRQ6hfqbH8Qc6MoDoeMWMMTkn3L84dwAW84ARTK6ZR7f9c4lVnabkCTaJJjicj8_L-4q_c_0g'
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNXAwMDAwMDhAZ21haWwuY29tIiwiaWF0IjoxNzQ1NzE4NTE0LCJleHAiOjE3NDYzMjMzMTR9.grUvp2-w89RdZNvMZfxBu29ODM44zX0m-ZinZp44IpH3NOtWIAwEckzDCFhRxHl15pCmCOgOfxVkkIY1c_lASg'
export const getWritingTest = (id: string): Promise<ResponseData<Example>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_WRITING_TEST}/${id}`).addToken(token).get().then(res => res.json());
}

export const submitWritingTest = (content: string): Promise<ResponseData<WritingFeedback>> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${END_POINTS.SUBMIT_WRITING_TEST}`, {
        method: 'POST', headers: {
            authorization: `Bearer ${token}`
        },
        body: content
    }).then(res => res.json())
}

export const getAllTopic = async (): Promise<ResponseData<{id: string, name: string}[]>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_ALL_TOPIC}`).addToken(token).get().then(res => res.json());
}

export const getWritingTestList = async (topicId: string) : Promise<ResponseData<WritingTestList>>=> {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_ALL_WRITING_TEST}/${topicId}`).addToken(token).get().then(res => res.json());
}

export const saveWritingTest = (body: {
    examId: string,
    listAnswers: string[],
    score: number,
    remarks: string
}) => {
    const api = new API();
    return api.addPathName(`${END_POINTS.SAVE_WRITING_TEST}`).addToken(token).post({
        ...body,
        userId: '67c9c116b4060540c59d2d00',
    }).then(res => res.json());
}