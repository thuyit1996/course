'use client'
import Button from '@/components/ui/button/Button';
import PlusIcon from '@/public/images/icons/plus.svg';
import Checkbox from '../form/input/Checkbox';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '../ui/table';
import EditIcon from '@/public/images/icons/edit.svg'
import TrashIcon from '@/public/images/icons/Trash.svg'
import LockIcon from '@/public/images/icons/lock.svg'
import moment from 'moment';
import Pagination from '../pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { decodeQueryParams } from 'serialize-query-params';
import { createQueryString, parseSearchParams, topicsPramConfig } from '@/libs/params';
import { useGetTopics } from '@/api/admin/query';

const Topics = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const decodedParams = decodeQueryParams(
        topicsPramConfig,
        parseSearchParams(searchParams)
    );
    const { data } = useGetTopics({
        ...decodedParams,
        pageSize: parseInt(searchParams.get('pageSize') ?? '10'),
        pageIndex: parseInt(searchParams.get('pageIndex') ?? '0'),
        orderDirection: 'desc',
    } as any);
    return (
        <main className="md:ml-[288px]">
            <div className='shadow rounded-3xl bg-white  h-[calc(100vh-2rem)]'>
                <div className='flex justify-between px-6 py-4'>
                    <div className='flex items-center'>
                        <span className='text-semibold text-lg'>Topic list</span>
                        <div className='border rounded-2xl ml-3 border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>{data?.total} {data?.total as number > 1 ? 'topics' : 'topic'}</div>
                    </div>
                    <Button variant='primary' onClick={console.log} startIcon={<PlusIcon className="fill-rose-600" />}>Create Topic</Button>
                </div>
                <div className=''>
                    <div className="overflow-hidden border-t border-gray-100 bg-white ">
                        <div className="max-w-full overflow-x-auto max-h-[70vh] overflow-y-auto">
                            <div className="min-w-[1102px]">
                                <Table>
                                    {/* Table Header */}
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

                                        {data?.topics?.length ? <>
                                            {data?.topics.map((topic) => (
                                                <TableRow key={topic.id}>
                                                    <TableCell className="px-5 py-3 text-gray-500 flex text-start text-theme-sm dark:text-gray-400">
                                                        <Checkbox onChange={console.log} checked={true} className="mr-2" />
                                                        <span>{topic.name}</span>
                                                    </TableCell>
                                                    <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                        {moment.unix(topic.createdDate / 1000).format("DD MMMM YYYY")}
                                                    </TableCell>
                                                    <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                        {topic?.creator?.displayName}
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
                router.push(`/admin/topics?${createQueryString(topicsPramConfig, { ...decodedParams, pageIndex })}`)
            }} total={data?.total ?? 0} initPageIndex={parseInt(searchParams.get('pageIndex') ?? '0')} />
        </main>
    )
}
export default Topics