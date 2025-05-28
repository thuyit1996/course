'use client'
import Button from '@/components/ui/button/Button';
import PlusIcon from '@/public/images/icons/plus.svg';
import Checkbox from '../form/input/Checkbox';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '../ui/table';
import EditIcon from '@/public/images/icons/edit.svg'
import TrashIcon from '@/public/images/icons/Trash.svg'
import LockIcon from '@/public/images/icons/lock.svg'
import Pagination from '../pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { decodeQueryParams } from 'serialize-query-params';
import { createQueryString, parseSearchParams, staffPramConfig } from '@/libs/params';
import { useGetStaff } from '@/api/admin/query';
import MaleIcon from '@/public/images/icons/GenderMale.svg';
import FemaleIcon from '@/public/images/icons/GenderFemale.svg';
import LGBTIcon from '@/public/images/icons/GenderIntersex.svg';
import { useModal } from '@/hooks/useModal';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { ROLES } from '@/libs/constant';
const AddUser = dynamic(() => import('@/components/add-user'), { ssr: false })
const CheckinModal = dynamic(() => import('@/components/checkin'), { ssr: false })
const Staffs = () => {
    const session = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const decodedParams = decodeQueryParams(
        staffPramConfig,
        parseSearchParams(searchParams)
    );
    const { data } = useGetStaff({
        ...decodedParams,
        pageSize: parseInt(searchParams.get('pageSize') ?? '10'),
        pageIndex: parseInt(searchParams.get('pageIndex') ?? '0'),
        orderBy: 'userId',
        orderDirection: 'desc',
        roles: 'ROLE_STAFF'
    } as any);
    const { isOpen, closeModal, openModal } = useModal();
    const checkinModal = useModal();
    console.log(data?.users)
    return (
        <main className="md:ml-[288px]">
            <div className='shadow rounded-3xl bg-white  h-[calc(100vh-2rem)]'>
                <div className='flex justify-between px-6 py-4'>
                    <div className='flex items-center'>
                        <span className='text-semibold text-lg'>Staff list</span>
                        <div className='border rounded-2xl ml-3 border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>{data?.total} {data?.total as number > 1 ? 'staffs' : 'staff'}</div>
                    </div>

                    {(session?.data?.user?.roles?.includes(ROLES.ADMIN) || session?.data?.user?.roles?.includes(ROLES.TEACHER)) ? (
                        <Button variant='primary' onClick={openModal} startIcon={<PlusIcon className="fill-rose-600" />}>Create Staff</Button>
                    ) : 
                        <Button variant='primary' onClick={checkinModal.openModal} startIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.875 14.375H18.125C18.2908 14.375 18.4497 14.3092 18.5669 14.1919C18.6842 14.0747 18.75 13.9158 18.75 13.75C18.75 13.5842 18.6842 13.4253 18.5669 13.3081C18.4497 13.1908 18.2908 13.125 18.125 13.125H17.5V11.875C17.4977 9.99478 16.7902 8.18382 15.5172 6.80005C14.2443 5.41628 12.4985 4.5604 10.625 4.40156V3.125H11.875C12.0408 3.125 12.1997 3.05915 12.3169 2.94194C12.4342 2.82473 12.5 2.66576 12.5 2.5C12.5 2.33424 12.4342 2.17527 12.3169 2.05806C12.1997 1.94085 12.0408 1.875 11.875 1.875H8.125C7.95924 1.875 7.80027 1.94085 7.68306 2.05806C7.56585 2.17527 7.5 2.33424 7.5 2.5C7.5 2.66576 7.56585 2.82473 7.68306 2.94194C7.80027 3.05915 7.95924 3.125 8.125 3.125H9.375V4.40156C7.5015 4.5604 5.75574 5.41628 4.48278 6.80005C3.20982 8.18382 2.50228 9.99478 2.5 11.875V13.125H1.875C1.70924 13.125 1.55027 13.1908 1.43306 13.3081C1.31585 13.4253 1.25 13.5842 1.25 13.75C1.25 13.9158 1.31585 14.0747 1.43306 14.1919C1.55027 14.3092 1.70924 14.375 1.875 14.375ZM3.75 11.875C3.75 10.2174 4.40848 8.62769 5.58058 7.45558C6.75269 6.28348 8.3424 5.625 10 5.625C11.6576 5.625 13.2473 6.28348 14.4194 7.45558C15.5915 8.62769 16.25 10.2174 16.25 11.875V13.125H3.75V11.875ZM18.75 16.25C18.75 16.4158 18.6842 16.5747 18.5669 16.6919C18.4497 16.8092 18.2908 16.875 18.125 16.875H1.875C1.70924 16.875 1.55027 16.8092 1.43306 16.6919C1.31585 16.5747 1.25 16.4158 1.25 16.25C1.25 16.0842 1.31585 15.9253 1.43306 15.8081C1.55027 15.6908 1.70924 15.625 1.875 15.625H18.125C18.2908 15.625 18.4497 15.6908 18.5669 15.8081C18.6842 15.9253 18.75 16.0842 18.75 16.25Z" fill="#e31b54" />
            </svg>
            }>Check in</Button>
                }
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
                                                    {/* <Checkbox onChange={console.log} checked={true} className="mr-2" /> */}
                                                    <span>Name</span>
                                                </div>
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
                                                Assistant Days
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                            >
                                                Supplementary Days
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                            >
                                                Gender
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                            >
                                                Email
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                            >
                                                Address
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                            >
                                                Phone
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                            >
                                                Date of Birth
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                                            >
                                                {(session?.data?.user?.roles?.includes(ROLES.ADMIN) || session?.data?.user?.roles?.includes(ROLES.TEACHER)) && (
                                                    <>Action</>
                                                )}
                                            </TableCell>

                                        </TableRow>
                                    </TableHeader>

                                    {/* Table Body */}
                                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">

                                        {data?.users?.length ? <>
                                            {data?.users.map((user) => (
                                                <TableRow key={user.userId}>
                                                    <TableCell className="px-5 py-3 text-gray-500 flex text-start text-theme-sm dark:text-gray-400">
                                                        {/* <Checkbox onChange={console.log} checked={true} className="mr-2" /> */}
                                                        <span>{user.displayName}</span>
                                                    </TableCell>
                                                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                        <span>{(user as any)?.classrooms?.map((item : {name: string}) => item.name ?? '')?.join(', ')}</span>
                                                    </TableCell>
                                                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                        <span>-</span>
                                                    </TableCell>
                                                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                        <span>-</span>
                                                    </TableCell>
                                                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                        {(user as any)?.gender === 'Male' ? <div className='gap-1 bg-success-50 border border-[#ABEFC6] text-[#079455] text-xs font-medium flex rounded-2xl justify-center items-center px-1.5 py-0.5'>
                                                            <MaleIcon className="w-3 h-3" />
                                                            Male
                                                        </div> : <>
                                                            {(user as any)?.gender === 'Female' ? <div className='gap-1 bg-error-50 text-error-600 border border-error-200 text-xs font-medium flex rounded-2xl justify-center items-center px-1.5 py-0.5'>
                                                                <FemaleIcon className="w-3 h-3" />
                                                                Female
                                                            </div> : <div className='gap-1 bg-[#E9D7FE] text-[#6941C6] border border-[#E9D7FE] text-xs font-medium flex rounded-2xl justify-center items-center px-1.5 py-0.5'>
                                                                <LGBTIcon className="w-3 h-3" />
                                                                LGBT
                                                            </div>}
                                                        </>}
                                                    </TableCell>
                                                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                        <span>{user.email}</span>
                                                    </TableCell>
                                                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                        <span>{user.address}</span>
                                                    </TableCell>
                                                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                        <span>{user.phone}</span>
                                                    </TableCell>
                                                    <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                        {/* DATE OF BIRTH */}
                                                        {user.dob ?? '-'}
                                                    </TableCell>
                                                    <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                        {(session?.data?.user?.roles?.includes(ROLES.ADMIN) || session?.data?.user?.roles?.includes(ROLES.TEACHER)) && (
                                                            <div className="flex gap-4">
                                                                <EditIcon className="cursor-pointer" />
                                                                <LockIcon className="cursor-pointer" />
                                                                <TrashIcon className="cursor-pointer" />
                                                            </div>
                                                        )}
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
                router.push(`/admin/staffs?${createQueryString(staffPramConfig, { ...decodedParams, pageIndex })}`)
            }} total={data?.total ?? 0} initPageIndex={parseInt(searchParams.get('pageIndex') ?? '0')} />
            {isOpen && <AddUser isOpen={isOpen} closeModal={(isSuccess) => {
                closeModal();
                if (isSuccess) {
                    router.push(`/admin/staffs?${createQueryString(staffPramConfig, { ...decodedParams, pageIndex: 0 })}`)
                }
            }} role='STAFF' />}
            {
                checkinModal.isOpen && <CheckinModal isOpen={checkinModal.isOpen} closeModal={checkinModal.closeModal}/>
            }
        </main>
    )
}
export default Staffs