/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getHistoryDetail, submitQuizTest } from "@/api/exam/fetches";
import { useEventSourceWithAutoReconnect } from "@/hooks/useEventSource";
import { useModal } from "@/hooks/useModal";
import { examResultType, InvokeTimmer, QuizExamType, UserAnswerList, WritingFeedback } from "@/types/exam";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from 'react-toastify';
import CountdownTimer from "../count-down";
import { QuestionGrid } from "../mini-test/question/question-grid";
import { flattenCards, getExamScore, getListAnswer, onGenNewQuestionID } from "../mini-test/utils";
import ConfirmModal from "../ui/confirm-modal";
import { RenderQuestionAnswer } from "../mini-test/question/render-question-answer";
import { ListQuestion } from "../mini-test/list-question";


export const QuizTestReview = ({ exam, examId, history }: { exam: QuizExamType, examId: string, history: examResultType[], }) => {
    const [answers, setAnswers] = useState<UserAnswerList>({});
    const cards = useMemo(() => {
        return onGenNewQuestionID(exam.cards);
    }, [exam.cards]);

    const onChangeAnswer = (questionId: string, answer: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    useEffect(() => {
        let historyAnswer = {}
        flattenCards(cards).map((card, index) => {
            if (history?.[0]?.listAnswer?.[index] !== undefined) {
                historyAnswer = {
                    ...historyAnswer,
                    [card.id]: history?.[0]?.listAnswer?.[index]
                }
            }
        })
        console.log('historyAnswer', historyAnswer)
        setAnswers(historyAnswer);
    }, [history])


    return (
        <div className="flex">
            <div className="gap-2 grid grid-cols-12 w-full">
                <div className={'col-span-8'}>
                    {/* Questions */}
                    <div className="flex-1 space-y-6 overflow-y-auto px-4">
                        <RenderQuestionAnswer cards={cards} isFinish={true} handleSelect={onChangeAnswer} answers={answers} />
                    </div>
                </div>
                <div className='rounded-lg col-span-4 sticky max-h-[444px] top-[104px]' data-aos="fade-left">
                    <ListQuestion cards={cards} answers={answers} isFinish={true} />
                </div>
            </div>
        </div>
    )
}