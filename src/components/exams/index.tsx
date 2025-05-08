'use client'
import { getExams } from '@/api/admin/fetches';
import Teachers from '@/components/teachers';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import PlusIcon from '@/public/images/icons/plus.svg';
import { Exam } from '@/types/admin';
import dynamic from 'next/dynamic';
import Checkbox from '../form/input/Checkbox';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '../ui/table';
import EditIcon from '@/public/images/icons/edit.svg'
import TrashIcon from '@/public/images/icons/Trash.svg'
import LockIcon from '@/public/images/icons/lock.svg'
import moment from 'moment';
const AddExam = dynamic(() => import('@/components/add-exam'), { ssr: false })

const Exams = ({ exams }: { exams: Exam[] }) => {
    console.log(exams);
    const { isOpen, closeModal, openModal } = useModal();
    return (
        <main className="md:ml-[288px]">
            <div className='shadow rounded-3xl bg-white  h-[calc(100vh-2rem)]'>
                <div className='flex justify-between px-6 py-4'>
                    <div className='flex items-center'>
                        <span className='text-semibold text-lg'>Exam list</span>
                        <div className='border rounded-2xl ml-3 border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>{exams?.length} {exams?.length ? 'exams' : 'exam'}</div>
                    </div>
                    <Button variant='primary' onClick={openModal} startIcon={<PlusIcon className="fill-rose-600" />}>Add exam</Button>
                </div>
                <div className=''>
                <div className="overflow-hidden border-t border-gray-100 bg-white ">
          <div className="max-w-full overflow-x-auto">
            <div className="min-w-[1102px]">
              <Table>
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 flex text-[#757575] text-xs font-semibold text-start"
                    >
                      <Checkbox onChange={console.log} checked={true} className="mr-2" />
                      <span>Name</span>
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                    >
                      ID
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                    >
                      Class
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                    >
                      Question (Count)
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

                  {exams?.length ? <>
                    {exams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="px-4 py-3 text-gray-500 flex text-start text-theme-sm dark:text-gray-400">
                          <Checkbox onChange={console.log} checked={true} className="mr-2" />
                          <span>{exam.name}</span>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            <span>{exam.code}</span>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <>{exam.classroomName}</>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <>
                            {exam.cardIds?.length ?? 0}
                          </>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {moment.unix(exam.createdDate/1000).format("DD MMMM YYYY")}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {exam?.creator?.displayName}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <div className="flex gap-4">
                            <EditIcon className="cursor-pointer" />
                            <LockIcon className="cursor-pointer" />
                            <TrashIcon className="cursor-pointer" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </> : <TableRow>
                    <TableCell  className="text-center py-10 text-gray-500" colSpan={9}>
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
            {
                isOpen && <AddExam closeModal={closeModal} isOpen={isOpen} />
            }
        </main>
    )
}
export default Exams