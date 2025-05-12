'use client';

import { Example, WritingFeedback } from "@/types/exam";
import React, { useEffect, useId, useRef, useState } from "react";
import CountdownTimer from "../count-down";
import parser from 'html-react-parser';

export interface InvokeTimmer {
    invokeCountDown: () => void;
    forceFinish: () => void;
}
const Writing = ({ exam, history, examId }: { exam: Example, history: { examResults: WritingFeedback[]; }, examId: string }) => {
    const countDownRef = useRef<InvokeTimmer>(null);
    useEffect(() => {
        countDownRef.current?.forceFinish();
    }, []);
    const response = history?.examResults?.[0];
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
    console.log(response);
    console.log(exam);
    const content = response?.listAnswer?.[0];
    const countWords = content?.trim?.() === ''
        ? 0
        : content?.trim?.().split(/\s+/)?.length;
    return (
        <>
            <div className="flex">
                <div className="max-h-[500px] lg:p-10 p-5 rounded-lg shadow text-center bg-white col-span-2 sticky top-[104px] w-[295px] mr-6" data-aos="fade-right">
                    <div className="text-base font-semibold text-indigo-600 lg:mb-10 mb-8">TIMER</div>
                    <CountdownTimer
                        submitExample={console.log}
                        onCancel={console.log}
                        onUpdateStatus={console.log}
                        ref={countDownRef}
                        onStop={console.log}
                        response={response as WritingFeedback}
                        isReview={true}
                        examId={examId}
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
                                <img src={exam?.cards?.[0]?.question?.image} alt="Graph" className="h-[360px] w-[756px] max-h-[756px] object-cover" />
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
                                        disabled
                                    />
                                </div>
                            </div> : null
                        }
                    </>}
                    <div className='rounded-lg col-span-4 sticky max-h-[444px] top-[104px]' data-aos="fade-left">
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
                                    fill="rgba(255, 255, 255, 0.03)"
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
                    </div>
                </div>
            </div>
        </>
    )
}
export default Writing