'use client'
import Teachers from '@/components/teachers';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { alert } from '@/libs/alert';
import PlusIcon from '@/public/images/icons/plus.svg';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
const AddQuestion = dynamic(() => import('@/components/add-question'), { ssr: false });
const ChooseQuestionType = dynamic(() => import('@/components/add-question/ChooseQuestionType'), { ssr: false });
const QuestionPage: React.FC = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const chooseQuestion = useModal();
    const [questionType, setQuestionType] = useState<0 | 1>(0);
    return (
        <>

            <main className="md:ml-[288px]">
                <div className='shadow rounded-3xl bg-white  h-[calc(100vh-2rem)]'>
                    <div className='flex justify-between px-6 py-4'>
                        <div className='flex items-center'>
                            <span className='text-semibold text-lg'>Teacher list</span>
                            <div className='border rounded-2xl ml-3 border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>100 teachers</div>
                        </div>
                        <Button variant='primary' onClick={() => chooseQuestion.openModal()} startIcon={<PlusIcon className="fill-rose-600" />}>Add question</Button>
                    </div>
                    <div className=''>
                        {/* <button
                            onClick={() => alert.success(<div>
                                <p className='text-[#2c2c2c] text-base font-semibold mb-1'>{`You're now in User View.`}</p>
                                <Link className='text-[#079455] underline text-sm' href='/'>Undo</Link>
                            </div>, "bottom-right")}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Gọi alert
                        </button> */}
                        <Teachers />
                    </div>
                </div>
                {
                    chooseQuestion.isOpen &&
                    <ChooseQuestionType isOpen={chooseQuestion.isOpen} closeModal={chooseQuestion.closeModal} chooseType={(value) => {
                        chooseQuestion.closeModal();
                        openModal();
                        setQuestionType(value)
                    }} />
                }
                {
                    isOpen &&
                    <AddQuestion
                        isOpen={isOpen}
                        openModal={openModal}
                        closeModal={closeModal}
                        goBack={() => {
                            closeModal();
                            chooseQuestion.openModal();
                        }}
                        questionType={questionType}
                    />
                }
            </main>
        </>
    );
};

export default QuestionPage;