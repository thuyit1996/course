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
import { getExamScore, getListAnswer, onGenNewQuestionID } from "../mini-test/utils";
import ConfirmModal from "../ui/confirm-modal";


export const QuizTest = ({ exam, examId, history }: { exam: QuizExamType, examId: string, history?: { examResults: examResultType[] }, }) => {
    const { isOpen, closeModal, openModal } = useModal();
    const { isOpen: isOpenWaiting, closeModal: closeModalWaiting, openModal: openModalWaiting } = useModal();
    const countDownRef = useRef<InvokeTimmer>(null);
    const [isStart, setIsStart] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [response, setResponse] = useState<WritingFeedback | null>(null)
    const [answers, setAnswers] = useState<UserAnswerList>({});
    const session = useSession();
    const url = session ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stream/scoreResult/${session.data?.user.userId}` : undefined;
    const { data, error } = useEventSourceWithAutoReconnect(url);
    const cards = useMemo(() => {
        return onGenNewQuestionID(exam.cards);
    }, [exam.cards]);


    useEffect(() => {
        if ((error as any)?.error) {
            closeModalWaiting();
            toast.error((error as any)?.error ?? '');
            countDownRef.current?.forceFinish();
            if ((error as any).userId && (error as any).examId) {
                getHistoryData((error as any).examId, (error as any).userId);
            }
        }
    }, [error]);

    useEffect(() => {
        if (data?.examId === examId && data?.userId) {
            getHistoryData(data.examId, data.userId);
            countDownRef.current?.forceFinish();
            closeModalWaiting();
        }
    }, [data]);

    const onChangeAnswer = (questionId: string, answer: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const getHistoryData = async (examId: string, userId: string) => {
        try {
            const resp = await getHistoryDetail(examId, userId);
            console.log(resp);
            if (resp.responseData) {
                setResponse(resp.responseData?.examResults?.[0])
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmitExam = async () => {
        try {
            openModalWaiting();
            const params = {
                examId,
                userId: session.data?.user.userId as string,
                listAnswers: getListAnswer(cards, answers),
                score: getExamScore(cards, answers),
            }
            const resp = await submitQuizTest(params);
            if (resp.responseData) {
                closeModalWaiting();
                setIsFinish(true);
                countDownRef.current?.forceFinish();
            } else {
                closeModalWaiting();
                toast.error(`Something went wrong`);
                countDownRef.current?.invokeCountDown();
            }
        } catch (error) {
            closeModalWaiting();
            countDownRef.current?.invokeCountDown();
            console.log(error);
            toast.error(`Something went wrong`);
        }
    }


    return (
        <>
            <div className="flex">
                <div className="max-h-[500px] lg:p-10 p-5 rounded-lg shadow text-center bg-white col-span-2 sticky top-[104px] w-[295px] mr-2" data-aos="fade-right">
                    <div className="text-base font-semibold text-indigo-600 lg:mb-10 mb-8">TIMER</div>
                    <CountdownTimer
                        submitExample={openModal}
                        onCancel={() => {
                            setIsStart(false)
                        }}
                        onUpdateStatus={setIsStart}
                        ref={countDownRef}
                        onStop={() => setIsStart(false)}
                        response={response as WritingFeedback}
                        onRetake={() => setResponse(null)}
                        alertFinish={() => setIsFinish(true)}
                        isHideTryAgain={true}
                        baseHref="/quiz-test"
                    />
                </div>
                <QuestionGrid cards={cards} isFinish={isFinish} isHide={(!isStart && !isFinish)} onChange={onChangeAnswer} />
            </div>
            <ConfirmModal isOpen={isOpen} closeModal={() => {
                closeModal();
                countDownRef.current?.invokeCountDown();
            }} buttonLabel={['Cancel', 'Submit Now']} handleSave={() => {
                closeModal();
                onSubmitExam();
            }} title="Submit Confirmation" content="This action will submit your answers. You won’t be able to make changes afterward. Are you sure you want to continue?" />
            {/* Modal waiting  */}
            <ConfirmModal isOpen={isOpenWaiting} closeModal={closeModalWaiting} isShowFooter={false}
                title="Scoring in progress..."
                content="Please wait a moment while we process your results."
            />
        </>
    )
}