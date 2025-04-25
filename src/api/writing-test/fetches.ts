import { ResponseData } from "@/types/api";
import { END_POINTS } from "../endpoint";
import { API } from "../fetch"
import { Example, WritingFeedback } from "@/types/exam";

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDU1NzE5NjksImV4cCI6MTc0NjE3Njc2OX0.zd82-U2bKqslWFRQ6hfqbH8Qc6MoDoeMWMMTkn3L84dwAW84ARTK6ZR7f9c4lVnabkCTaJJjicj8_L-4q_c_0g'
export const getWritingTest = (id = '680939fa6ca0ae13fc78f963'): Promise<ResponseData<Example>> => {
    const api = new API();
    return api.addPathName(`${END_POINTS.GET_WRITING_TEST}/${id}`).addToken(token).get().then(res => res.json());
}

export const submitWritingTest = (content: string): Promise<ResponseData<WritingFeedback>> => {
    // return fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${END_POINTS.SUBMIT_WRITING_TEST}`, {
    //     method: 'POST', headers: {
    //         authorization: `Bearer ${token}`
    //     },
    //     body: content
    // }).then(res => res.json())
    return Promise.resolve({
        "responseData": {
            "Overall_Band_Score": 5.5,
            "Task_Achievement": 6.0,
            "Coherence": 5.0,
            "Lexical_Resource": 6.0,
            "Grammar": 4.5,
            "Feedback": "**Personalized Study Plan**\n\n**1. Detailed Feedback**\n\n- Task Achievement (6.0)\n    Your score reflects an understanding of the requirements of the assignment. However, the essay seems to lack a full, detailed development. An essay should provide thorough analyses of trends, comparisons, or data findings. \n\n- Coherence (5.0)\n    The essay demonstrates an understanding of the topic but lacks clear connectivity and coherence. Maintain a logical flow and use linking words to guide readers. \n\n- Lexical Resource (6.0)\n   Your vocabulary usage is versatile. However, try to avoid repeated and unnecessary words as they can affect the fluency of the essay.\n\n- Grammar (4.5)\n   There are grammatical errors in your essay. These may present throttles to the fluency for readers.\n\n**2. Actionable Strategies**\n\n- Task Achievement\n    Study sample charts/graphs and practice chart description. Try to focus on the general trend, significant data points, comparisons, and contrasts. \n\n- Coherence\n   Practice using cohesive devices such as transitional phrases (e.g., however, subsequently, for instance), pronouns, conjunctions, and synonyms to improve the flow between ideas.\n\n- Lexical Resource\n   Enhance your vocabulary by introducing new words every day, focusing especially on adjectives, adverbs, and descriptive phrases related to charts, graphs, and trends.\n\n- Grammar\n   Review and practice English grammar rules. Pay close attention to verb tenses, word order, preposition use, and article usage. \n\n**3. Example Corrections:** \n\nSince we weren't provided with the actual essay content, we can't critique it explicitly. However, for common errors - \n\nIncorrect: \"Some people is like to watch movies.\"\nCorrect: \"Some people like to watch movies.\"\n\nIncorrect: \"Sales was going up in 2020.\"\nCorrect: \"Sales were going up in 2020.\"\n\n**4. Recommended Study Resources:**\n\n- Task Achievement\n    Use the British Council’s IELTS practice materials. They have numerous charts and graphs for describing and summarizing data. \n\n- Coherence\n    Visit websites like British Council, IELTS Buddy, and IELTS Advantage to see examples of well-structured essays and learn how cohesive devices are used.\n\n- Lexical Resource\n    Use dictionaries such as Oxford, Cambridge, or Merriam-Webster. They offer Word of the Day subscriptions that can help improve your vocabulary.\n\n"
        }
    })
}