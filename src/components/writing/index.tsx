'use client';

import { Example, WritingFeedback } from "@/types/exam";
import React, { useRef, useState, useTransition } from "react";
import CountdownTimer from "../count-down";
import { useModal } from "@/hooks/useModal";
import ConfirmModal from "../ui/confirm-modal";
import parser, { DOMNode, domToReact, Element } from 'html-react-parser';
import { toast } from 'react-toastify';
import { submitWritingTest } from "@/api/writing-test/fetches";

export interface InvokeTimmer {
    invokeCountDown: () => void;
}
const Writing = ({ exam }: { exam: Example }) => {
    const [content, setContent] = useState('');
    const { isOpen, closeModal, openModal } = useModal();
    const { isOpen: isOpenWaiting, closeModal: closeModalWaiting, openModal: openModalWaiting } = useModal();
    const countDownRef = useRef<InvokeTimmer>(null);
    const [isStart, setIsStart] = useState(false);
    const [response, setResponse] = useState<WritingFeedback | null>(null)
    const [isPending, startTransition] = useTransition();
    const countWords = content?.trim?.() === ''
        ? 0
        : content?.trim?.().split(/\s+/)?.length;
    const onSubmitExam = () => {
        try {
            if (!content) {
                countDownRef.current?.invokeCountDown();
                toast.error(`You haven't entered any content. Please add content before submitting.`);
            } else {
                openModalWaiting();
                startTransition(async () => {
                    const resp = await submitWritingTest(content);
                    if (resp.responseData) {
                        closeModalWaiting();
                        setResponse(resp.responseData);
                    }
                })
            }
        } catch (error) {
            closeModalWaiting();
            countDownRef.current?.invokeCountDown();
            console.log(error);
            toast.error(`Something went wrong`);
        }
    }
    console.log(content.replace(/\n/g, "<br />"));
    const feedback = response ? parser(response?.Feedback, {
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
    return (
        <>
            <div className="max-h-[444px] lg:p-10 p-5 rounded-lg shadow text-center bg-white col-span-3 sticky top-[104px]" data-aos="fade-right">
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
                />
            </div>
            {response ? <div className={'col-span-6'}>
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
                    exam?.cards?.[0] ? <div className={response ? 'col-span-6' : 'col-span-9'} data-aos="fade-left">
                        < div className=" bg-white p-10 rounded-lg shadow" >
                            <div className="text-base font-semibold text-indigo-600 mb-4">QUESTION</div>
                            <p className="text-sm lg:text-base 4xl:text-lg mb-4 font-medium text-[#262626]">
                                {exam?.cards?.[0]?.question?.text}
                            </p>
                            <div className="px-10 flex justify-center">
                                <img src={exam?.cards?.[0]?.question?.image} alt="Graph" className="h-[360px] w-[756px] max-h-[756px] object-cover" />
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
            {response ? <div className='rounded-lg col-span-3 sticky top-[104px]' data-aos="fade-left">
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
                        <p className="text-lg lg:text-4xl 4xl:text-6xl text-white font-bold">{response.Overall_Band_Score}</p>
                    </div>
                </div>
                <ul className='uppercase border-indigo-100 rounded-lg shadow' style={{
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                }}>
                    <li className='border-b border-indigo-100 bg-indigo-50'>
                        <div className='4xl:px-10 4xl:py-7.5 xl:px-6 xl:py-4 px-4 py-3 flex justify-between items-center'>
                            <span className='text-sm 4xl:text-base text-indigo-600 font-semibold'>Task Achievement</span>
                            <span className='text-xl 4xl:text-[36px] text-[#1F235B] leading-[44px]'>{response.Task_Achievement}</span>
                        </div>
                    </li>
                    <li className='border-b border-indigo-100 bg-indigo-50'>
                        <div className='4xl:px-10 4xl:py-7.5 xl:px-6 xl:py-4 px-4 py-3 flex justify-between items-center'>
                            <span className='text-sm 4xl:text-base text-indigo-600 font-semibold'>Coherence</span>
                            <span className='text-xl 4xl:text-[36px] text-[#1F235B] leading-[44px]'>{response.Coherence}</span>
                        </div>
                    </li>
                    <li className='border-b border-indigo-100 bg-indigo-50'>
                        <div className='4xl:px-10 4xl:py-7.5 xl:px-6 xl:py-4 px-4 py-3 flex justify-between items-center'>
                            <span className='text-sm 4xl:text-base text-indigo-600 font-semibold'>Lexical resource</span>
                            <span className='text-xl 4xl:text-[36px] text-[#1F235B] leading-[44px]'>{response.Lexical_Resource}</span>
                        </div>
                    </li>
                    <li className='bg-indigo-50'>
                        <div className='4xl:px-10 4xl:py-7.5 xl:px-6 xl:py-4 px-4 py-3 flex justify-between items-center'>
                            <span className='text-sm 4xl:text-base text-indigo-600 font-semibold'>Grammatical</span>
                            <span className='text-xl 4xl:text-[36px] text-[#1F235B] leading-[44px]'>{response.Grammar}</span>
                        </div>
                    </li>
                </ul>
            </div> : null
            }

        </>
    )
}
export default Writing