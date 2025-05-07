// src/components/Sidebar.tsx
'use client';
import React from 'react';
import Teacher from '@/public/images/logo/teacher.svg';
import Exam from '@/public/images/logo/exam.svg';
import Grade from '@/public/images/logo/grade.svg';
import Staff from '@/public/images/logo/staff.svg';
import Topic from '@/public/images/icons/topic.svg';
import Question from '@/public/images/icons/question.svg';
import UserDropdown from '../header/UserDropdown';
import Link from 'next/link';
import { useGetAllClass } from '@/api/admin/query';
import { useParams, usePathname } from 'next/navigation';
const Sidebar: React.FC = () => {
    const { data } = useGetAllClass();
    const params = useParams();
    const pathname = usePathname();
    console.log(params);
    return (
        <aside className="hidden md:flex flex-col w-[276px] shadow rounded-3xl bg-white py-4 h-[calc(100vh-2rem)] fixed inset-4 z-30">
            <div className='pb-4 border-b border-gray-100  px-4.5'>
                <img src="/images/logo/logo-main.svg" className='h-10' />
            </div>
            <nav className="flex-1 px-4.5 py-4  sidenav-menu max-h-[70vh] overflow-y-auto">
                <div>
                    <p className="font-semibold text-sm text-[#757575] px-4">Account</p>
                    <Link href="/admin/teachers" className="font-medium text-sm flex flex-row items-center mt-1 px-4 py-3 hover:bg-rose-100 ease-in-out transition duration-300 rounded-lg hover:text-rose-600">
                        <Teacher className="mr-2" />
                        <span>Teacher</span></Link>
                    <a href="#" className="font-medium text-sm flex flex-row items-center mt-1 px-4 py-3 hover:bg-rose-100 ease-in-out transition duration-300 rounded-lg hover:text-rose-600">
                        <Staff className="mr-2" />
                        <span>Staff</span></a>
                </div>
                <div className='mt-4'>
                    <p className="font-semibold text-sm text-[#757575] px-4">Exam</p>
                    <Link href="/admin/exams" className={`font-medium text-sm flex flex-row items-center mt-1 px-4 py-3 hover:bg-rose-100 ease-in-out transition duration-300 rounded-lg hover:text-rose-600 ${pathname === '/admin/exams' ? 'text-rose-600 bg-rose-100 active' : '' }`}>
                        <Exam className="mr-2" />
                        <span>Exams</span></Link>
                    <Link href="/admin/topics" className="font-medium text-sm flex flex-row items-center mt-1 px-4 py-3 hover:bg-rose-100 ease-in-out transition duration-300 rounded-lg hover:text-rose-600">
                        <Topic className="mr-2" />
                        <span>Topics</span></Link>
                    <Link href="/admin/questions" className={`font-medium text-sm flex flex-row items-center mt-1 px-4 py-3 hover:bg-rose-100 ease-in-out transition duration-300 rounded-lg hover:text-rose-600 ${pathname === '/admin/questions' ? 'text-rose-600 bg-rose-100 active' : '' }`}>
                        <Question className="mr-2" />
                        <span>Questions</span></Link>
                </div>
                <div className='mt-4'>
                    <p className="font-semibold text-sm text-[#757575] px-4">Class</p>
                    <div>
                        {data?.responseData?.classroom?.map((grade, index) => (
                            <Link href={`/admin/grade/${grade.id}?grade=${grade.name}`} key={grade.id} className={`font-medium text-sm flex flex-row items-center mt-1 px-4 py-3 hover:bg-rose-100 ease-in-out transition duration-300 rounded-lg hover:text-rose-600 ${params?.id === grade.id ? 'text-rose-600 bg-rose-100 active' : ''}`}>
                                <Grade className="mr-2" />
                                <span>{grade.name}</span></Link>
                        ))}

                    </div>
                </div>
            </nav>
            <div className="px-4 fixed bottom-8 w-[274px]">
                <div className="mt-4 flex items-center p-4 border border-gray-100 rounded-3xl">
                    <UserDropdown isAdminSite={true}/>
                </div>

            </div>
        </aside >
    );
};

export default Sidebar;
