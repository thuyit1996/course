'use server';

import { ResponseData } from "@/types/api";
import { WritingFeedback } from "@/types/exam";
import { submitWritingTest } from "./fetches";

export const submitWritingTestAction = (content: string): Promise<ResponseData<WritingFeedback>> => {
    return submitWritingTest(content)
}