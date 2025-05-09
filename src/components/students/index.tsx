'use client'
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import PlusIcon from '@/public/images/icons/plus.svg';
import Checkbox from '../form/input/Checkbox';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '../ui/table';
import EditIcon from '@/public/images/icons/edit.svg'
import TrashIcon from '@/public/images/icons/Trash.svg'
import LockIcon from '@/public/images/icons/lock.svg'
import Pagination from '../pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { decodeQueryParams } from 'serialize-query-params';
import { createQueryString, parseSearchParams, studentPramConfig } from '@/libs/params';
import { useGetStudent } from '@/api/admin/query';
import { omit } from 'lodash';
import MaleIcon from '@/public/images/icons/GenderMale.svg';
import FemaleIcon from '@/public/images/icons/GenderFemale.svg';
import LGBTIcon from '@/public/images/icons/GenderIntersex.svg';

const Students = ({ gradeId }: { gradeId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const decodedParams = decodeQueryParams(
    studentPramConfig,
    parseSearchParams(searchParams)
  );
  const { data } = useGetStudent({
    ...omit(decodedParams, 'grade'),
    pageSize: parseInt(searchParams.get('pageSize') ?? '10'),
    pageIndex: parseInt(searchParams.get('pageIndex') ?? '0'),
    orderBy: 'userId',
    orderDirection: 'desc',
    classroomIds: gradeId,
  } as any);
  return (
    <main className="md:ml-[288px]">
      <div className='shadow rounded-3xl bg-white  h-[calc(100vh-2rem)]'>
        <div className='flex justify-between px-6 py-4'>
          <div className='flex items-center'>
            <span className='text-semibold text-lg'>{searchParams.get('grade')}</span>
            <div className='border rounded-2xl ml-3 border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>{data?.total} {data?.total as number > 1 ? 'students' : 'student'}</div>
          </div>
          <div className='flex gap-x-3'>
            <Button variant='outline' onClick={console.log} startIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.875 3.125H3.125C2.79348 3.125 2.47554 3.2567 2.24112 3.49112C2.0067 3.72554 1.875 4.04348 1.875 4.375V15.625C1.875 15.9565 2.0067 16.2745 2.24112 16.5089C2.47554 16.7433 2.79348 16.875 3.125 16.875H4.17109C4.28938 16.875 4.40525 16.8415 4.50524 16.7783C4.60522 16.7151 4.68522 16.6248 4.73594 16.518C5.03986 15.8763 5.5197 15.3341 6.11965 14.9544C6.71959 14.5748 7.415 14.3732 8.125 14.3732C8.835 14.3732 9.53041 14.5748 10.1304 14.9544C10.7303 15.3341 11.2101 15.8763 11.5141 16.518C11.5648 16.6248 11.6448 16.7151 11.7448 16.7783C11.8448 16.8415 11.9606 16.875 12.0789 16.875H16.875C17.2065 16.875 17.5245 16.7433 17.7589 16.5089C17.9933 16.2745 18.125 15.9565 18.125 15.625V4.375C18.125 4.04348 17.9933 3.72554 17.7589 3.49112C17.5245 3.2567 17.2065 3.125 16.875 3.125ZM6.25 11.25C6.25 10.8792 6.35997 10.5166 6.56599 10.2083C6.77202 9.89996 7.06486 9.65964 7.40747 9.51773C7.75008 9.37581 8.12708 9.33868 8.49079 9.41103C8.85451 9.48337 9.1886 9.66195 9.45083 9.92417C9.71305 10.1864 9.89163 10.5205 9.96397 10.8842C10.0363 11.2479 9.99919 11.6249 9.85727 11.9675C9.71536 12.3101 9.47504 12.603 9.16669 12.809C8.85835 13.015 8.49584 13.125 8.125 13.125C7.62772 13.125 7.15081 12.9275 6.79917 12.5758C6.44754 12.2242 6.25 11.7473 6.25 11.25ZM16.875 15.625H12.4555C11.9335 14.7277 11.1468 14.0138 10.2031 13.5812C10.6762 13.16 11.0102 12.6049 11.1606 11.9895C11.311 11.3741 11.2709 10.7276 11.0455 10.1356C10.8202 9.54352 10.4202 9.03396 9.89859 8.67443C9.37701 8.31489 8.75849 8.12236 8.125 8.12236C7.49151 8.12236 6.87299 8.31489 6.35141 8.67443C5.82984 9.03396 5.42985 9.54352 5.20447 10.1356C4.97909 10.7276 4.93896 11.3741 5.0894 11.9895C5.23985 12.6049 5.57376 13.16 6.04688 13.5812C5.10321 14.0138 4.31646 14.7277 3.79453 15.625H3.125V4.375H16.875V15.625ZM4.375 7.5V6.25C4.375 6.08424 4.44085 5.92527 4.55806 5.80806C4.67527 5.69085 4.83424 5.625 5 5.625H15C15.1658 5.625 15.3247 5.69085 15.4419 5.80806C15.5592 5.92527 15.625 6.08424 15.625 6.25V13.75C15.625 13.9158 15.5592 14.0747 15.4419 14.1919C15.3247 14.3092 15.1658 14.375 15 14.375H13.75C13.5842 14.375 13.4253 14.3092 13.3081 14.1919C13.1908 14.0747 13.125 13.9158 13.125 13.75C13.125 13.5842 13.1908 13.4253 13.3081 13.3081C13.4253 13.1908 13.5842 13.125 13.75 13.125H14.375V6.875H5.625V7.5C5.625 7.66576 5.55915 7.82473 5.44194 7.94194C5.32473 8.05915 5.16576 8.125 5 8.125C4.83424 8.125 4.67527 8.05915 4.55806 7.94194C4.44085 7.82473 4.375 7.66576 4.375 7.5Z" fill="#2C2C2C" />
            </svg>
            }>Harper Lena</Button>
            <Button variant='outline' onClick={console.log} startIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.125 11.7498C19.0593 11.7991 18.9846 11.8349 18.9051 11.8553C18.8256 11.8756 18.7429 11.8801 18.6616 11.8685C18.5804 11.8569 18.5022 11.8294 18.4316 11.7876C18.3609 11.7458 18.2992 11.6905 18.25 11.6248C17.8733 11.1185 17.3829 10.7076 16.8185 10.4254C16.254 10.1431 15.6311 9.99737 15 9.99981C14.8771 9.9998 14.7569 9.96356 14.6545 9.89561C14.5521 9.82766 14.472 9.73102 14.4242 9.61778C14.3918 9.54089 14.3751 9.45827 14.3751 9.37481C14.3751 9.29135 14.3918 9.20874 14.4242 9.13185C14.472 9.01861 14.5521 8.92197 14.6545 8.85402C14.7569 8.78607 14.8771 8.74983 15 8.74981C15.3507 8.74978 15.6943 8.65141 15.9919 8.46586C16.2895 8.28032 16.529 8.01504 16.6834 7.70016C16.8378 7.38528 16.9007 7.03342 16.8652 6.68455C16.8296 6.33568 16.6969 6.00378 16.4821 5.72655C16.2673 5.44932 15.9791 5.23788 15.6502 5.11623C15.3213 4.99459 14.9649 4.96762 14.6214 5.03839C14.278 5.10917 13.9612 5.27484 13.7072 5.5166C13.4532 5.75836 13.272 6.06652 13.1844 6.40606C13.1638 6.48558 13.1279 6.56027 13.0785 6.62587C13.0291 6.69148 12.9673 6.74672 12.8965 6.78843C12.8258 6.83014 12.7476 6.85752 12.6662 6.86899C12.5849 6.88046 12.5022 6.8758 12.4226 6.85528C12.3431 6.83476 12.2684 6.79878 12.2028 6.7494C12.1372 6.70001 12.082 6.63819 12.0403 6.56746C11.9986 6.49673 11.9712 6.41847 11.9597 6.33716C11.9483 6.25585 11.9529 6.17308 11.9734 6.09356C12.0951 5.62272 12.325 5.18677 12.6448 4.8204C12.9646 4.45404 13.3656 4.16737 13.8157 3.98321C14.2658 3.79905 14.7526 3.72249 15.2375 3.7596C15.7224 3.79672 16.192 3.94649 16.6088 4.19701C17.0256 4.44753 17.3782 4.79187 17.6386 5.20264C17.8989 5.61341 18.0598 6.07927 18.1084 6.56316C18.157 7.04704 18.092 7.53559 17.9186 7.98993C17.7451 8.44427 17.468 8.85187 17.1094 9.18028C17.9592 9.54825 18.698 10.1322 19.2523 10.874C19.3016 10.9399 19.3374 11.0148 19.3576 11.0944C19.3779 11.1741 19.3822 11.257 19.3704 11.3383C19.3585 11.4197 19.3308 11.4979 19.2887 11.5685C19.2466 11.6391 19.1909 11.7007 19.125 11.7498ZM14.9156 16.5623C14.9608 16.6334 14.9912 16.713 15.0049 16.7962C15.0186 16.8793 15.0153 16.9644 14.9952 17.0463C14.9752 17.1282 14.9388 17.2051 14.8882 17.2726C14.8376 17.34 14.7739 17.3965 14.7009 17.4387C14.628 17.4809 14.5472 17.5079 14.4635 17.5181C14.3799 17.5282 14.295 17.5213 14.214 17.4979C14.1331 17.4744 14.0577 17.4348 13.9925 17.3814C13.9272 17.328 13.8734 17.262 13.8344 17.1873C13.4407 16.5207 12.8799 15.9682 12.2075 15.5843C11.5351 15.2005 10.7742 14.9987 9.99999 14.9987C9.22575 14.9987 8.46489 15.2005 7.79247 15.5843C7.12006 15.9682 6.55933 16.5207 6.16562 17.1873C6.12655 17.262 6.07277 17.328 6.00752 17.3814C5.94228 17.4348 5.86691 17.4744 5.78595 17.4979C5.705 17.5213 5.62013 17.5282 5.53645 17.5181C5.45277 17.5079 5.37202 17.4809 5.29904 17.4387C5.22606 17.3965 5.16237 17.34 5.11179 17.2726C5.06122 17.2051 5.02482 17.1282 5.00476 17.0463C4.98471 16.9644 4.98142 16.8793 4.9951 16.7962C5.00878 16.713 5.03915 16.6334 5.08437 16.5623C5.6903 15.5212 6.61421 14.7019 7.7203 14.2248C7.0979 13.7483 6.64048 13.0887 6.41234 12.3387C6.18419 11.5888 6.19679 10.7862 6.44836 10.0438C6.69994 9.30139 7.17784 8.65648 7.81489 8.19972C8.45194 7.74296 9.21611 7.49731 9.99999 7.49731C10.7839 7.49731 11.548 7.74296 12.1851 8.19972C12.8221 8.65648 13.3 9.30139 13.5516 10.0438C13.8032 10.7862 13.8158 11.5888 13.5876 12.3387C13.3595 13.0887 12.9021 13.7483 12.2797 14.2248C13.3858 14.7019 14.3097 15.5212 14.9156 16.5623ZM9.99999 13.7498C10.4944 13.7498 10.9778 13.6032 11.3889 13.3285C11.8 13.0538 12.1205 12.6633 12.3097 12.2065C12.4989 11.7497 12.5484 11.247 12.452 10.7621C12.3555 10.2771 12.1174 9.83168 11.7678 9.48205C11.4181 9.13242 10.9727 8.89431 10.4877 8.79785C10.0028 8.70139 9.5001 8.7509 9.04328 8.94011C8.58647 9.12933 8.19602 9.44977 7.92132 9.86089C7.64662 10.272 7.49999 10.7554 7.49999 11.2498C7.49999 11.9129 7.76338 12.5487 8.23223 13.0176C8.70107 13.4864 9.33695 13.7498 9.99999 13.7498ZM5.62499 9.37481C5.62499 9.20905 5.55914 9.05008 5.44193 8.93287C5.32472 8.81566 5.16575 8.74981 4.99999 8.74981C4.64931 8.74978 4.30567 8.65141 4.00809 8.46586C3.71052 8.28032 3.47094 8.01504 3.31658 7.70016C3.16222 7.38528 3.09925 7.03342 3.13484 6.68455C3.17042 6.33568 3.30313 6.00378 3.51789 5.72655C3.73265 5.44932 4.02085 5.23788 4.34976 5.11623C4.67866 4.99459 5.03509 4.96762 5.37856 5.03839C5.72203 5.10917 6.03876 5.27484 6.29279 5.5166C6.54681 5.75836 6.72795 6.06652 6.81562 6.40606C6.85706 6.56664 6.96059 6.70419 7.10344 6.78843C7.24629 6.87268 7.41676 6.89672 7.57734 6.85528C7.73792 6.81384 7.87546 6.71031 7.9597 6.56746C8.04395 6.42461 8.06799 6.25414 8.02655 6.09356C7.90487 5.62272 7.67497 5.18677 7.35516 4.8204C7.03534 4.45404 6.63443 4.16737 6.18433 3.98321C5.73423 3.79905 5.24736 3.72249 4.76246 3.7596C4.27756 3.79672 3.80801 3.94649 3.39119 4.19701C2.97436 4.44753 2.62175 4.79187 2.36142 5.20264C2.10108 5.61341 1.94021 6.07927 1.89161 6.56316C1.843 7.04704 1.908 7.53559 2.08143 7.98993C2.25486 8.44427 2.53194 8.85187 2.89062 9.18028C2.04162 9.5486 1.30368 10.1325 0.749993 10.874C0.650433 11.0066 0.607629 11.1734 0.630998 11.3375C0.654367 11.5017 0.741994 11.6499 0.874602 11.7494C1.00721 11.849 1.17394 11.8918 1.33811 11.8684C1.50227 11.845 1.65043 11.7574 1.74999 11.6248C2.1267 11.1185 2.61703 10.7076 3.18152 10.4254C3.74601 10.1431 4.36888 9.99737 4.99999 9.99981C5.16575 9.99981 5.32472 9.93397 5.44193 9.81676C5.55914 9.69955 5.62499 9.54057 5.62499 9.37481Z" fill="#2C2C2C" />
            </svg>
            }>Nicky Andi</Button>
            <Button variant='secondary' onClick={console.log} startIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.875 14.375H18.125C18.2908 14.375 18.4497 14.3092 18.5669 14.1919C18.6842 14.0747 18.75 13.9158 18.75 13.75C18.75 13.5842 18.6842 13.4253 18.5669 13.3081C18.4497 13.1908 18.2908 13.125 18.125 13.125H17.5V11.875C17.4977 9.99478 16.7902 8.18382 15.5172 6.80005C14.2443 5.41628 12.4985 4.5604 10.625 4.40156V3.125H11.875C12.0408 3.125 12.1997 3.05915 12.3169 2.94194C12.4342 2.82473 12.5 2.66576 12.5 2.5C12.5 2.33424 12.4342 2.17527 12.3169 2.05806C12.1997 1.94085 12.0408 1.875 11.875 1.875H8.125C7.95924 1.875 7.80027 1.94085 7.68306 2.05806C7.56585 2.17527 7.5 2.33424 7.5 2.5C7.5 2.66576 7.56585 2.82473 7.68306 2.94194C7.80027 3.05915 7.95924 3.125 8.125 3.125H9.375V4.40156C7.5015 4.5604 5.75574 5.41628 4.48278 6.80005C3.20982 8.18382 2.50228 9.99478 2.5 11.875V13.125H1.875C1.70924 13.125 1.55027 13.1908 1.43306 13.3081C1.31585 13.4253 1.25 13.5842 1.25 13.75C1.25 13.9158 1.31585 14.0747 1.43306 14.1919C1.55027 14.3092 1.70924 14.375 1.875 14.375ZM3.75 11.875C3.75 10.2174 4.40848 8.62769 5.58058 7.45558C6.75269 6.28348 8.3424 5.625 10 5.625C11.6576 5.625 13.2473 6.28348 14.4194 7.45558C15.5915 8.62769 16.25 10.2174 16.25 11.875V13.125H3.75V11.875ZM18.75 16.25C18.75 16.4158 18.6842 16.5747 18.5669 16.6919C18.4497 16.8092 18.2908 16.875 18.125 16.875H1.875C1.70924 16.875 1.55027 16.8092 1.43306 16.6919C1.31585 16.5747 1.25 16.4158 1.25 16.25C1.25 16.0842 1.31585 15.9253 1.43306 15.8081C1.55027 15.6908 1.70924 15.625 1.875 15.625H18.125C18.2908 15.625 18.4497 15.6908 18.5669 15.8081C18.6842 15.9253 18.75 16.0842 18.75 16.25Z" fill="#444CE7" />
            </svg>
            }>Attendance</Button>
            <Button variant='primary' onClick={console.log} startIcon={<PlusIcon className="fill-rose-600" />}>Add Student</Button>
          </div>
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
                        className="px-5 py-3 flex text-[#757575] text-xs font-semibold text-start"
                      >
                        <Checkbox onChange={console.log} checked={true} className="mr-2" />
                        <span>Name</span>
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                      >
                        Attendance
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 text-[#757575] text-xs font-semibold  text-start"
                      >
                        Homework
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
                        Phone
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
                        Date of Birth
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

                    {data?.users?.length ? <>
                      {data?.users.map((user) => (
                        <TableRow key={user.userId}>
                          <TableCell className="px-5 py-3 text-gray-500 flex text-start text-theme-sm dark:text-gray-400">
                            <Checkbox onChange={console.log} checked={true} className="mr-2" />
                            <span>{user.displayName}</span>
                          </TableCell>
                          <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            <>-</>
                          </TableCell>
                          <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            <>-</>
                          </TableCell>
                          <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            <>
                              {(user as any)?.gender ? <>{(user as any)?.gender === 'Male' ? <div className='gap-1 bg-success-50 border border-[#ABEFC6] text-[#079455] text-xs font-medium flex rounded-2xl justify-center items-center px-1.5 py-0.5'>
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
                              </>}</> : '-'}

                            </>
                          </TableCell>
                          <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {user.phone}
                          </TableCell>
                          <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {user.email}
                          </TableCell>
                          <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {user.address ?? '-'}
                          </TableCell>
                          <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            <>-</>
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
        router.push(`/admin/grade/${gradeId}?${createQueryString(studentPramConfig, { ...decodedParams, pageIndex })}`)
      }} total={data?.total ?? 0} initPageIndex={parseInt(searchParams.get('pageIndex') ?? '0')} />
    </main>
  )
}
export default Students