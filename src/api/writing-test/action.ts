'use server';

import { ResponseData } from "@/types/api";
import { WritingFeedback } from "@/types/exam";
import { submitWritingTest } from "./fetches";

export const submitWritingTestAction = (content: string): Promise<ResponseData<WritingFeedback>> => {
    // return submitWritingTest(content)
    return new Promise(res => {
        res({
            responseData: {
                Overall_Band_Score: 5.0,
                Task_Achievement: 6.0,
                Coherence: 4.5,
                Lexical_Resource: 5.5,
                Grammar: 4.5,
                Feedback: "**Study",
            }
        })
    })
}