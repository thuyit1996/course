'use client'
import Teachers from '@/components/teachers';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import PlusIcon from '@/public/images/icons/plus.svg';
import dynamic from 'next/dynamic';
const AddQuestion = dynamic(() => import('@/components/add-question'), { ssr: false });
const QuestionPage: React.FC = () => {
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>

            <main className="md:ml-[288px]">
                <div className='shadow rounded-3xl bg-white  h-[calc(100vh-2rem)]'>
                    <div className='flex justify-between px-6 py-4'>
                        <div className='flex items-center'>
                            <span className='text-semibold text-lg'>Teacher list</span>
                            <div className='border rounded-2xl ml-3 border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>100 teachers</div>
                        </div>
                        <Button variant='primary' onClick={() => openModal()} startIcon={<PlusIcon className="fill-rose-600" />}>Add question</Button>
                    </div>
                    <div className=''>
                        <Teachers />
                    </div>
                </div>
                {
                    isOpen &&
                    <AddQuestion isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
                }
            </main>
        </>
    );
};

export default QuestionPage;