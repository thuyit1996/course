import React from 'react';
import Logo from '/images/logo/Logomark.svg';
import HeaderHomeIcon from '@/public/images/logo/header-home-icon.svg';
const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-[#f2f3f7] min-h-screen font-sans">
            {/* Navbar */}
            <nav className="bg-white shadow flex justify-between items-center py-5.5 px-[175px]">
                {/* <div className="text-xl text-[#2C2C2C] font-bold flex align-center justify-center">
                    <img src="/images/logo/Logomark.svg" alt="avatar" className='mr-3' />
                    MS.LAN ENGLISH</div> */}
                <img src="/images/logo/logo-main.svg" />
                <div className="flex space-x-6 text-[#2c2c2c] text-sm">
                    <div className="font-medium flex justify-center items-center">
                        <HeaderHomeIcon className='mr-[2.5px]'  fill="red"/>
                        <span>Home</span>
                    </div>
                    <a href="#" className="font-medium">Mini Test</a>
                    <a href="#" className="font-medium">Writing Test</a>
                    <a href="#" className="font-medium">Quiz Test</a>
                </div>
                <div className="flex items-center space-x-2">
                    <img src="/images/logo/Logomark.svg" alt="avatar" />
                    <span className="text-sm font-medium">Xuan Tung</span>
                    <span className="text-xs text-gray-500">Grade 12</span>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto mt-8 grid grid-cols-12 gap-6 px-4">

                {/* Timer */}
                <div className="col-span-12 md:col-span-3 bg-white p-6 rounded-lg shadow text-center">
                    <div className="text-sm font-semibold text-blue-500 mb-4">TIMER</div>
                    <div className="w-32 h-32 mx-auto border-4 border-blue-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-700">
                        20:00
                    </div>
                    <button className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 font-medium rounded">Start</button>
                </div>

                {/* Question & Chart */}
                <div className="col-span-12 md:col-span-9 bg-white p-6 rounded-lg shadow">
                    <div className="text-sm font-semibold text-blue-700 mb-2">QUESTION</div>
                    <p className="text-gray-700 mb-4">
                        The line graph shows the percentages of Australian export with four countries. The graph below shows the percentage of Australian exports to 4 countries from 1990 to 2012?
                    </p>
                    <div className="bg-gray-100 p-4 rounded">
                        <img src="/mnt/data/Screenshot 2025-04-23 090149.png" alt="Graph" className="w-full h-auto rounded shadow" />
                    </div>
                </div>

                {/* Answer Box */}
                <div className="col-span-12 bg-white p-6 rounded-lg shadow">
                    <div className="text-sm font-semibold text-blue-700 mb-2">ANSWER</div>
                    <textarea
                        className="w-full h-40 border border-gray-300 rounded p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                        placeholder="Your ideas matter, share them here.. (Once you start typing, the timer will begin automatically)"
                    />
                    <div className="text-sm text-right text-gray-500 mt-2">Word Count: {100}</div>
                </div>

            </div>
        </div>
    )
}
export default UserLayout;