'use client';

import { Example } from "@/types/exam";
import { useRef, useState, useTransition } from "react";
import CountdownTimer from "../count-down";
import { useModal } from "@/hooks/useModal";
import ConfirmModal from "../ui/confirm-modal";
import { submitWritingTestAction } from "@/api/writing-test/action";
import { toast } from 'react-toastify';

export interface InvokeTimmer {
    invokeCountDown: () => void;
}
const Writing = ({ exam }: { exam: Example }) => {
    const [content, setContent] = useState('');
    const { isOpen, closeModal, openModal } = useModal();
    const { isOpen: isOpenWaiting, closeModal: closeModalWaiting, openModal: openModalWaiting } = useModal();
    const countDownRef = useRef<InvokeTimmer>(null);
    const [isStart, setIsStart] = useState(false);
    const [isPending, startTransition] = useTransition();
    const countWords = content?.trim?.() === ''
        ? 0
        : content?.trim?.().split(/\s+/)?.length;
    const onSubmitExam = () => {
        try {
            if (!content) {
                toast.error(`You haven't entered any content. Please add content before submitting.`);
            } else {
                openModalWaiting();
                startTransition(async () => {
                    const resp = await submitWritingTestAction(content);
                    if (resp) {

                    }
                })
            }
        } catch (error) {
            console.log(error);
            toast.error(`Something went wrong`);
        }
    }
    console.log(isStart);
    return (
        <>
            <div className="max-h-[444px] lg:p-10 p-5 rounded-lg shadow text-center bg-white col-span-3 sticky top-[104px]">
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
                />
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
                            className="w-full h-[320px]  bg-gray-50 rounded-lg border-0 overflow-auto focus:outline-none text-sm lg:text-base 4xl:text-lg text-[#262626] placeholder-gray-400 resize-none disabled:opacity-50"
                            placeholder={exam?.cards?.[0]?.question?.hint}
                            value={content}
                            disabled={!isStart}
                            onChange={(event) => setContent(event.target.value)}
                        />
                    </div>
                </div > : null
            }
            <ConfirmModal isOpen={isOpen} closeModal={() => {
                closeModal();
                countDownRef.current?.invokeCountDown();
            }} buttonLabel={['Cancel', 'Submit Now']} handleSave={() => {
                closeModal();
                onSubmitExam();
                countDownRef.current?.invokeCountDown();
                // openModalWaiting();
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