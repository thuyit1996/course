import React from 'react';
import Logo from '/images/logo/Logomark.svg';
import HeaderHomeIcon from '@/public/images/logo/header-home-icon.svg';
import MiniTestIcon from '@/public/images/logo/header-mini-test-icon.svg';
import WritingTestIcon from '@/public/images/logo/header-writing-test-icon.svg';
import QuizTestIcon from '@/public/images/logo/header-quiz-test-icon.svg';
import UserDropdown from '@/components/header/UserDropdown';
import CountdownTimer from '@/components/count-down';
import Image from 'next/image';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-[#f2f3f7] min-h-screen font-sans">
            {/* Navbar */}
            <nav className="bg-white shadow flex justify-between items-center py-4 3xl:px-[175px] 2xl:px-[150px] lg:px-[100px] md:px-6">
                {/* <div className="text-xl text-[#2C2C2C] font-bold flex align-center justify-center">
                    <img src="/images/logo/Logomark.svg" alt="avatar" className='mr-3' />
                    MS.LAN ENGLISH</div> */}
                <img src="/images/logo/logo-main.svg" />
                <div className="flex space-x-2 lg:space-x-6 text-sm">
                    <div className="header-icon font-medium text-[#2c2c2c] flex px-4 py-3 bg-white justify-center items-center rounded-lg ease-in-out transition duration-300 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600">
                        <HeaderHomeIcon className='mr-2' />
                        <span>Home</span>
                    </div>
                    <div className="header-icon font-medium text-[#2c2c2c] flex px-4 py-3 bg-white justify-center items-center rounded-lg ease-in-out transition duration-300 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600">
                        <MiniTestIcon className='mr-2' />
                        <span>Mini Test</span>
                    </div>
                    <div className="header-icon font-medium text-[#2c2c2c] flex px-4 py-3 bg-white justify-center items-center rounded-lg ease-in-out transition duration-300 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600">
                        <WritingTestIcon className='mr-2' />
                        <span>Writing Test</span>
                    </div>
                    <div className="header-icon font-medium text-[#2c2c2c] flex px-4 py-3 bg-white justify-center items-center rounded-lg ease-in-out transition duration-300 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600">
                        <QuizTestIcon className='mr-2' />
                        <span>Quiz Test</span>
                    </div>
                    {/* <a href="#" className="font-medium">Mini Test</a>
                    <a href="#" className="font-medium">Writing Test</a>
                    <a href="#" className="font-medium">Quiz Test</a> */}
                </div>
                <UserDropdown />
            </nav>

            {/* Main Content */}
            <div className=" 3xl:px-[175px] 2xl:px-[150px] lg:px-[100px] md:px-6 mt-8 gap-6 px-4 grid grid-cols-12">

                {/* Timer */}
                <div className="max-h-[444px] lg:p-10 p-5 rounded-lg shadow text-center bg-white col-span-3">
                    <div className="text-base font-semibold text-indigo-600 lg:mb-10 mb-8">TIMER</div>
                    {/* <div className="w-32 h-32 mx-auto border-4 border-blue-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-700 lg:mb-10 mb-8">
                        20:00
                    </div> */}
                    <CountdownTimer />
                </div>

                <div className='col-span-6'>
                    <div className=" bg-white p-10 rounded-lg shadow">
                        <div className="text-base font-semibold text-indigo-600 mb-4">QUESTION</div>
                        <p className="text-lg mb-4 font-medium text-[#262626]">
                            The line graph shows the percentages of Australian export with four countries. The graph below shows the percentage of Australian exports to 4 countries from 1990 to 2012?
                        </p>
                        <div className="px-10 flex justify-center">
                            <img src="/images/mock-chart.png" alt="Graph" className="h-[360px] w-[756px] max-h-[756px]" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow mt-4">
                        <div className='flex justify-between mb-4'>
                            <span className='text-base font-semibold text-indigo-600 mb-4'>ANSWER</span>
                            <span className="text-blue-gray-400 text-sm">Word Count: 4</span>
                        </div>
                        <textarea
                            className="w-full h-[320px]  bg-gray-50 rounded-lg border-0 overflow-auto focus:outline-none text-lg text-[#262626] placeholder-gray-400 resize-none"
                            placeholder="Your ideas matter, share them here.. (Once you start typing, the timer will begin automatically)"
                        />
                    </div>
                </div>
                <div className='rounded-lg col-span-3'>
                    <div className='p-10 relative overflow-hidden' style={{
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                    }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F71] to-[#252C8C] z-0" />

                        {/* Curved SVG Overlay */}
                        <svg
                            className="absolute bottom-0 right-0 z-10"
                            width="100%"
                            height="100%"
                            viewBox="0 0 454 150"
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M454,100 C370,180 100,120 0,160 L0,150 L454,150 Z"
                                fill="rgba(255, 255, 255, 0.03)" // nhẹ nhàng thôi để không đè gradient
                            />
                        </svg>
                        <div className='relative z-20 flex items-center justify-between'>

                            <p className=" text-[24px] leading-[100%] tracking-[2px] text-white font-bold">OVERALL <br />BAND SCORE</p>
                            <p className="text-6xl text-white font-bold">4.5</p>
                        </div>
                    </div>
                    <ul className='uppercase border-indigo-100 rounded-lg shadow' style={{
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                    }}>
                        <li className='border-b border-indigo-100 bg-indigo-50'>
                            <div className='px-10 py-7.5 flex justify-between items-center'>
                                <span className='text-base text-indigo-600 font-semibold'>Task Achievement</span>
                                <span className='text-[36px] text-[#1F235B] leading-[44px]'>4.5</span>
                            </div>
                        </li>
                        <li className='border-b border-indigo-100 bg-indigo-50'>
                            <div className='px-10 py-7.5 flex justify-between items-center'>
                                <span className='text-base text-indigo-600 font-semibold'>Task Achievement</span>
                                <span className='text-[36px] text-[#1F235B] leading-[44px]'>4.5</span>
                            </div>
                        </li>
                        <li className='border-b border-indigo-100 bg-indigo-50'>
                            <div className='px-10 py-7.5 flex justify-between items-center'>
                                <span className='text-base text-indigo-600 font-semibold'>Task Achievement</span>
                                <span className='text-[36px] text-[#1F235B] leading-[44px]'>4.5</span>
                            </div>
                        </li>
                        <li className='bg-indigo-50'>
                            <div className='px-10 py-7.5 flex justify-between items-center'>
                                <span className='text-base text-indigo-600 font-semibold'>Task Achievement</span>
                                <span className='text-[36px] text-[#1F235B] leading-[44px]'>4.5</span>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}
export default UserLayout;