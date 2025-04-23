// src/components/Sidebar.tsx
import React from 'react';
import Teacher from '@/public/images/logo/teacher.svg';
import Exam from '@/public/images/logo/exam.svg';
import Grade from '@/public/images/logo/grade.svg';
import Staff from '@/public/images/logo/staff.svg';
import UserDropdown from '../header/UserDropdown';
const Sidebar: React.FC = () => {
    return (
        <aside className="hidden md:flex flex-col w-[276px] shadow rounded-3xl bg-white py-4 h-[calc(100vh-2rem)] fixed inset-4 z-30">
            <div className='pb-4 border-b border-gray-100  px-4.5'>
                <img src="/images/logo/logo-main.svg" />
            </div>
            <nav className="flex-1 px-4.5 py-4  sidenav-menu">
                <div>
                    <p className="font-semibold text-sm text-[#757575] px-4">Account</p>
                    <a href="#" className="font-medium text-sm flex flex-row items-center mt-1 px-4 py-3 hover:bg-rose-100 ease-in-out transition duration-300 rounded-lg hover:text-rose-600">
                        <Teacher className="mr-2" />
                        <span>Teacher</span></a>
                    <a href="#" className="font-medium text-sm flex flex-row items-center mt-1 px-4 py-3 hover:bg-rose-100 ease-in-out transition duration-300 rounded-lg hover:text-rose-600">
                        <Staff className="mr-2" />
                        <span>Staff</span></a>
                </div>
                <div className='mt-4'>
                    <p className="font-semibold text-sm text-[#757575] px-4">Exam</p>
                    <a href="#" className="font-medium text-sm flex flex-row items-center mt-1 px-4 py-3 hover:bg-rose-100 ease-in-out transition duration-300 rounded-lg hover:text-rose-600">
                        <Exam className="mr-2" />
                        <span>All Exam</span></a>
                </div>
                <div className='mt-4'>
                    <p className="font-semibold text-sm text-[#757575] px-4">Class</p>
                    {['Grade 11', 'Grade 10', 'Grade 9', 'Grade 8', 'Grade 7', 'Grade 6', 'Grade 5'].map((grade, index) => (
                        <a href="#" key={grade} className="font-medium text-sm flex flex-row items-center mt-1 px-4 py-3 hover:bg-rose-100 ease-in-out transition duration-300 rounded-lg hover:text-rose-600">
                            <Grade className="mr-2" />
                            <span>Grade {index + 1}</span></a>
                    ))}
                </div>
            </nav>
            <div className="px-4">
                <div className="mt-4 flex items-center p-4 border border-gray-100 rounded-3xl">
                    <UserDropdown />
                </div>

            </div>
        </aside>
    );
};

export default Sidebar;
