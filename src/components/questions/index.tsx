'use client'
import Teachers from '@/components/teachers';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import PlusIcon from '@/public/images/icons/plus.svg';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Checkbox from '../form/input/Checkbox';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '../ui/table';
import { useRouter, useSearchParams } from 'next/navigation';
import { decodeQueryParams } from 'serialize-query-params';
import { createQueryString, parseSearchParams, questionPramConfig } from '@/libs/params';
import { useGetQuestions } from '@/api/admin/query';
import EditIcon from '@/public/images/icons/edit.svg'
import TrashIcon from '@/public/images/icons/Trash.svg'
import LockIcon from '@/public/images/icons/lock.svg'
import FillblankIcon from '@/public/images/icons/fillblank.svg';
import MultichoiceIcon from '@/public/images/icons/multichoice.svg';
import Pagination from '../pagination';

const AddQuestion = dynamic(() => import('@/components/add-question'), { ssr: false });
const ChooseQuestionType = dynamic(() => import('@/components/add-question/ChooseQuestionType'), { ssr: false });
const Questions: React.FC = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const router = useRouter();
    const chooseQuestion = useModal();
    const [questionType, setQuestionType] = useState<0 | 1>(0);
    const searchParams = useSearchParams();
    const decodedParams = decodeQueryParams(
        questionPramConfig,
        parseSearchParams(searchParams)
    );
    const { data } = useGetQuestions({
        ...decodedParams,
        pageSize: parseInt(searchParams.get('pageSize') ?? '10'),
        pageIndex: parseInt(searchParams.get('pageIndex') ?? '0'),
        orderDirection: 'desc',
    } as any);
    return (
        <>
            <main className="md:ml-[288px]">
                <div className='shadow rounded-3xl bg-white  h-[calc(100vh-2rem)]'>
                    <div className='flex justify-between px-6 py-4'>
                        <div className='flex items-center'>
                            <span className='text-semibold text-lg'>Question list</span>
                            <div className='border rounded-2xl ml-3 border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>{data?.total} {data?.total as number > 1 ? 'questions' : 'question'}</div>
                        </div>
                        <Button variant='primary' onClick={() => chooseQuestion.openModal()} startIcon={<PlusIcon className="fill-rose-600" />}>Create Question</Button>
                    </div>
                    <div className=''>
                        <div className="overflow-hidden border-t border-gray-100 bg-white ">
                            <div className="max-w-full overflow-x-auto max-h-[70vh] overflow-y-auto">
                                <div className="min-w-[1102px]">
                                    <Table>
                                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                            <TableRow>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 text-[#757575] text-xs font-semibold text-start"
                                                >
                                                    <div className='flex'>
                                                        <Checkbox onChange={console.log} checked={true} className="mr-2" />
                                                        <span>Name</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                                >
                                                    Type
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                                >
                                                    Image
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                                >
                                                    Sound
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                                >
                                                    Child Questions
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                                >
                                                    Date Creation
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                                >
                                                    Creator
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                                >
                                                    <>Action</>
                                                </TableCell>
                                            </TableRow>
                                        </TableHeader>

                                        {/* Table Body */}
                                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">

                                            {data?.cards?.length ? <>
                                                {data?.cards.map((card) => (
                                                    <TableRow key={card.id}>
                                                        <TableCell className="px-5 py-3 text-gray-500 flex text-start text-theme-sm dark:text-gray-400 max-w-[280px] overflow-hidden">
                                                            <Checkbox onChange={console.log} checked={true} className="mr-2" />
                                                            <span className='line-clamp-3'>{card.question?.text ?? ''}</span>
                                                        </TableCell>
                                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                            {card.type === 'FILL_BLANK' ?
                                                                <div className='gap-1 bg-indigo-50 text-indigo-500 text-xs font-medium flex rounded-2xl justify-center items-center px-1.5 py-0.5'>
                                                                    <FillblankIcon className="w-3 h-3" />
                                                                    Fill Blank
                                                                </div> :
                                                                <div className='gap-1 bg-rose-50 text-rose-600 text-xs font-medium flex rounded-2xl justify-center items-center px-1.5 py-0.5'>
                                                                    <MultichoiceIcon className="w-3 h-3" />
                                                                    Multiple Choice
                                                                </div>
                                                            }
                                                        </TableCell>
                                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                            {card.question?.image ? <img src={card.question.image} className='w-15 h-12 rounded-lg object-cover' /> : '-'}
                                                        </TableCell>
                                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                            {card.question?.sound ? <img src="/images/Sound.jpg" className='w-15 h-12 rounded-lg object-cover' /> : '-'}
                                                        </TableCell>
                                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                            <span>{card.childCards?.length ? card.childCards.length : '-'}</span>
                                                        </TableCell>
                                                        <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                            {moment.unix(card.createdDate / 1000).format("DD MMMM YYYY")}
                                                        </TableCell>
                                                        <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                            {card?.creator?.displayName}
                                                        </TableCell>
                                                        <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                            <div className="flex gap-4">
                                                                <EditIcon className="cursor-pointer" />
                                                                <LockIcon className="cursor-pointer" />
                                                                <TrashIcon className="cursor-pointer" />
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </> : <TableRow>
                                                <TableCell className="text-center py-10 text-gray-500" colSpan={9}>
                                                    <div className="flex flex-col items-center justify-center space-y-2">
                                                        <svg
                                                            className="w-10 h-10 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008H14.25V9.75zM21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                                                            />
                                                        </svg>
                                                        <p className="text-[#757575] italic text-lg">No data available to display</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination onChange={(pageIndex: number) => {
                    router.push(`/admin/questions?${createQueryString(questionPramConfig, { ...decodedParams, pageIndex })}`)
                }} total={data?.total ?? 0} initPageIndex={parseInt(searchParams.get('pageIndex') ?? '0')} />
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
                        closeModal={(isSuccess) => {
                            closeModal();
                            if(isSuccess) {
                                router.push('/admin/questions');
                            }
                        }}
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

export default Questions;