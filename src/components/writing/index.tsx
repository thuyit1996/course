'use client';

import { Example } from "@/types/exam";
import { useState } from "react";
import CountdownTimer from "../count-down";
import { Modal } from "../ui/modal";
import { useModal } from "@/hooks/useModal";
import Button from "../ui/button/Button";

const Writing = ({ exam }: { exam: Example }) => {
    const [content, setContent] = useState('');
    const countWords = content?.trim?.() === ''
        ? 0
        : content?.trim?.().split(/\s+/)?.length;

    const { isOpen, openModal, closeModal } = useModal();
    const handleSave = () => {
        // Handle save logic here
        console.log("Saving changes...");
        closeModal();
    };
    return (
        <>
            <div className="max-h-[444px] lg:p-10 p-5 rounded-lg shadow text-center bg-white col-span-3 sticky top-[104px]">
                <div className="text-base font-semibold text-indigo-600 lg:mb-10 mb-8">TIMER</div>
                <CountdownTimer />
            </div>
            {
                exam?.cards?.[0] ? <div className='col-span-9'>
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
                            className="w-full h-[320px]  bg-gray-50 rounded-lg border-0 overflow-auto focus:outline-none text-sm lg:text-base 4xl:text-lg text-[#262626] placeholder-gray-400 resize-none"
                            placeholder={exam?.cards?.[0]?.question?.hint}
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                        />
                    </div>
                </div > : null
            }
        </>
    )
}
export default Writing