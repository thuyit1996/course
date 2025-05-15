/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Example, WritingFeedback } from "@/types/exam";
import React, { useEffect, useId, useRef, useState } from "react";
import CountdownTimer from "../count-down";
import { useModal } from "@/hooks/useModal";
import ConfirmModal from "../ui/confirm-modal";
import parser from 'html-react-parser';
import { toast } from 'react-toastify';
import { getHistoryDetail, submitWritingTest } from "@/api/writing-test/fetches";
import { useSession } from "next-auth/react";
import { useEventSourceWithAutoReconnect } from "@/hooks/useEventSource";

export interface InvokeTimmer {
    invokeCountDown: () => void;
    forceFinish: () => void;
}
const Writing = ({ exam, examId }: { exam: Example, examId: string }) => {
    const [content, setContent] = useState('');
    const { isOpen, closeModal, openModal } = useModal();
    const { isOpen: isOpenWaiting, closeModal: closeModalWaiting, openModal: openModalWaiting } = useModal();
    const countDownRef = useRef<InvokeTimmer>(null);
    const [isStart, setIsStart] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [response, setResponse] = useState<WritingFeedback | null>(null)
    const session = useSession();
    const countWords = content?.trim?.() === ''
        ? 0
        : content?.trim?.().split(/\s+/)?.length;

    const url = session ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stream/scoreResult/${session.data?.user.userId}` : undefined;

    const { data, error } = useEventSourceWithAutoReconnect(url);
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
            if (!content) {
                countDownRef.current?.invokeCountDown();
                toast.error(`You haven't entered any content. Please add content before submitting.`);
            } else {
                openModalWaiting();
                const resp = await submitWritingTest(examId, content);
                if (resp.responseData) {
                    // closeModalWaiting();
                } else {
                    closeModalWaiting();
                    toast.error(`Something went wrong`);
                    countDownRef.current?.invokeCountDown();
                }
            }
        } catch (error) {
            closeModalWaiting();
            countDownRef.current?.invokeCountDown();
            console.log(error);
            toast.error(`Something went wrong`);
        }
    }
    const feedback = response ? parser(response?.remarks, {
        replace(domNode) {
            if (domNode.type === 'text') {
                const text = domNode.data as string;
                if (!text.includes('\n')) return;
                const parts = text.split('\n');
                return (
                    <>
                        {parts.map((part, index) => (
                            <React.Fragment key={index}>
                                {part}
                                {index < parts.length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </>
                );
            }

        },
    }) : '';
    console.log(isStart);
    return (
        <>
            <div className="flex">
                <div className="max-h-[500px] lg:p-10 p-5 rounded-lg shadow text-center bg-white col-span-2 sticky top-[104px] w-[295px] mr-6" data-aos="fade-right">
                    <div className="text-base font-semibold text-indigo-600 lg:mb-10 mb-8">TIMER</div>
                    <CountdownTimer
                        submitExample={openModal}
                        onCancel={() => {
                            setContent('');
                            setIsStart(false)
                        }}
                        onUpdateStatus={setIsStart}
                        ref={countDownRef}
                        onStop={() => setIsStart(false)}
                        response={response as WritingFeedback}
                        onRetake={() => setResponse(null)}
                        alertFinish={() => setIsFinish(true)}
                    />
                </div>
                <div className="gap-6 grid grid-cols-12 w-full">
                    {response ? <div className={'col-span-8'}>
                        <div className=" bg-white p-10 rounded-lg shadow mb-4" >
                            <div className="text-base font-semibold text-indigo-600 mb-4">QUESTION</div>
                            <p className="text-sm lg:text-base 4xl:text-lg mb-4 font-medium text-[#262626]">
                                {exam?.cards?.[0]?.question?.text}
                            </p>
                            <div className="px-10 flex justify-center">
                                {exam?.cards?.[0]?.question?.image ?
                                    <img src={exam?.cards?.[0]?.question?.image} alt="Graph" className="h-[360px] w-[756px] max-h-[756px] object-cover" />
                                    : null
                                }
                            </div>
                        </div >
                        <div className="bg-white p-10 rounded-lg shadow">
                            <div className='flex justify-between mb-4'>
                                <span className='text-base font-semibold text-indigo-600 mb-4'>ANSWER</span>
                                <span className="text-blue-gray-400 text-sm">Word Count: {countWords}</span>
                            </div>
                            <div className="text-sm lg:text-base 3xl:text-lg text-[#2c2c2c] min-h-[400px]" dangerouslySetInnerHTML={{ __html: content?.replace(/\n/g, "<br />") }}></div>
                        </div>
                        <div className="bg-indigo-50 mt-4 p-10 shadow rounded-lg">
                            <div className='mb-4'>
                                <span className='text-base font-semibold text-indigo-600 mb-4'>FEEDBACK</span>
                            </div>
                            <div className="text-sm lg:text-base 3xl:text-lg text-[#1f235b] min-h-[400px]">{feedback}</div>
                        </div>
                    </div> : <>
                        {
                            exam?.cards?.[0] ? <div className={'col-span-12'} data-aos="fade-left">
                                <div className=" bg-white p-10 rounded-lg shadow" >
                                    <div className="text-base font-semibold text-indigo-600 mb-4">QUESTION</div>
                                    <div className={`${(!isStart && !isFinish) ? 'blur-sm brightness-125 contrast-110 rounded-md' : ''}`}>
                                        <p className="text-sm lg:text-base 4xl:text-lg mb-4 font-medium text-[#262626]">
                                            {exam?.cards?.[0]?.question?.text}
                                        </p>
                                        <div className="px-10 flex justify-center">
                                            {exam?.cards?.[0]?.question?.image ? 
                                            <img src={exam?.cards?.[0]?.question?.image} alt="Graph" className="h-[360px] w-[756px] max-h-[756px] object-cover" />
                                             : null
                                            }
                                        </div>
                                    </div>
                                </div >
                                <div className="bg-white p-6 rounded-lg shadow mt-4">
                                    <div className='flex justify-between mb-4'>
                                        <span className='text-base font-semibold text-indigo-600 mb-4'>ANSWER</span>
                                        <span className="text-blue-gray-400 text-sm">Word Count: {countWords}</span>
                                    </div>
                                    <textarea
                                        className="w-full h-[320px]  bg-gray-50 rounded-lg border-0 overflow-auto focus:outline-none text-sm lg:text-base 4xl:text-lg text-[#262626] placeholder-gray-400 resize-none disabled:opacity-50"
                                        placeholder={exam?.cards?.[0]?.question?.hint}
                                        value={content}
                                        disabled={!isStart || !!response}
                                        onChange={(event) => setContent(event.target.value)}
                                    />
                                </div>
                            </div> : null
                        }
                    </>}
                    {response ? <div className='rounded-lg col-span-4 sticky max-h-[444px] top-[104px]' data-aos="fade-left">
                        <div className='4xl:p-10 p-3 md:p4 2xl:p-6 relative overflow-hidden' style={{
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                        }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F71] to-[#252C8C] z-0" />
                            <svg
                                className="absolute bottom-0 right-0 z-10"
                                width="100%"
                                height="100%"
                                viewBox="0 0 454 150"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M454,100 C370,180 100,120 0,160 L0,150 L454,150 Z"
                                    fill="rgba(255, 255, 255, 0.03)" // nhẹ nhàng thôi để không đè gradient
                                />
                            </svg>
                            <div className='relative z-20 flex items-center justify-between'>
                                <p className="text-base lg:text-lg 4xl:text-[24px] leading-[100%] tracking-[2px] text-white font-bold">OVERALL <br />BAND SCORE</p>
                                <p className="text-lg lg:text-4xl 4xl:text-6xl text-white font-bold">{response.score}</p>
                            </div>
                        </div>
                        <ul className='uppercase border-indigo-100 rounded-lg shadow' style={{
                            borderBottomLeftRadius: 8,
                            borderBottomRightRadius: 8,
                        }}>
                            <li className='border-b border-indigo-100 bg-indigo-50'>
                                <div className='4xl:px-10 4xl:py-7.5 xl:px-6 xl:py-4 px-4 py-3 flex justify-between items-center'>
                                    <span className='text-sm 4xl:text-base text-indigo-600 font-semibold'>Task Achievement</span>
                                    <span className='text-xl 4xl:text-[36px] text-[#1F235B] leading-[44px]'>{response.taskAchievement}</span>
                                </div>
                            </li>
                            <li className='border-b border-indigo-100 bg-indigo-50'>
                                <div className='4xl:px-10 4xl:py-7.5 xl:px-6 xl:py-4 px-4 py-3 flex justify-between items-center'>
                                    <span className='text-sm 4xl:text-base text-indigo-600 font-semibold'>Coherence</span>
                                    <span className='text-xl 4xl:text-[36px] text-[#1F235B] leading-[44px]'>{response.coherence}</span>
                                </div>
                            </li>
                            <li className='border-b border-indigo-100 bg-indigo-50'>
                                <div className='4xl:px-10 4xl:py-7.5 xl:px-6 xl:py-4 px-4 py-3 flex justify-between items-center'>
                                    <span className='text-sm 4xl:text-base text-indigo-600 font-semibold'>Lexical resource</span>
                                    <span className='text-xl 4xl:text-[36px] text-[#1F235B] leading-[44px]'>{response.lexicalResource}</span>
                                </div>
                            </li>
                            <li className='bg-indigo-50'>
                                <div className='4xl:px-10 4xl:py-7.5 xl:px-6 xl:py-4 px-4 py-3 flex justify-between items-center'>
                                    <span className='text-sm 4xl:text-base text-indigo-600 font-semibold'>Grammatical</span>
                                    <span className='text-xl 4xl:text-[36px] text-[#1F235B] leading-[44px]'>{response.grammar}</span>
                                </div>
                            </li>
                        </ul>
                    </div> : null
                    }
                </div>
            </div>
            <ConfirmModal isOpen={isOpen} closeModal={() => {
                closeModal();
                countDownRef.current?.invokeCountDown();
            }} buttonLabel={['Cancel', 'Submit Now']} handleSave={() => {
                closeModal();
                onSubmitExam();
            }} title="Have you finished your writing?" content="Once you submit, you won’t be able to edit your response.<br /> Are you sure you want to submit?" />
            {/* Modal waiting  */}
            <ConfirmModal isOpen={isOpenWaiting} closeModal={closeModalWaiting} isShowFooter={false}
                title="Scoring in progress..."
                content="The AI is evaluating your writing.<br/> Please wait a moment while we process your results."
            />
        </>
    )
}
export default Writing