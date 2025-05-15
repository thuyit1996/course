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
    return (
        <main className="md:ml-[288px]">
            <div className='shadow rounded-3xl bg-white  h-[calc(100vh-2rem)]'>
                <div className='flex justify-between px-6 py-4'>
                    <div className='flex items-center'>
                        <span className='text-semibold text-lg'>Staff list</span>
                        <div className='border rounded-2xl ml-3 border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>{data?.total} {data?.total as number > 1 ? 'staffs' : 'staff'}</div>
                    </div>

                    {(session?.data?.user?.roles?.includes(ROLES.ADMIN) || session?.data?.user?.roles?.includes(ROLES.TEACHER)) && (
                        <Button variant='primary' onClick={openModal} startIcon={<PlusIcon className="fill-rose-600" />}>Create Staff</Button>
                    )}
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
                                                Class
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
                                                        <Checkbox onChange={console.log} checked={true} className="mr-2" />
                                                        <span>{user.displayName}</span>
                                                    </TableCell>
                                                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                        <span>{(user as any)?.classroom?.name}</span>
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
                                                        <>-</>
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
        </main>
    )
}
export default Staffs