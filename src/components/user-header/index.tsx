'use client';

import HeaderHomeIcon from '@/public/images/logo/header-home-icon.svg';
import MiniTestIcon from '@/public/images/logo/header-mini-test-icon.svg';
import WritingTestIcon from '@/public/images/logo/header-writing-test-icon.svg';
import QuizTestIcon from '@/public/images/logo/header-quiz-test-icon.svg';
import UserDropdown from '@/components/header/UserDropdown';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const UserHeader = () => {
    const pathname = usePathname();
    const [isScroll, setIsScroll] = useState(false);
    const menu = [
        {title : 'Home', icon : HeaderHomeIcon, link: '/'},
        {title : 'Mini Test', icon : MiniTestIcon, link: '/mini-test'},
        {title : 'Writing Test', icon : WritingTestIcon, link: '/writing-test'},
        {title : 'Quiz Test', icon : QuizTestIcon, link: '/quiz-test'},
    ]
    useEffect(() => {
        const initScrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        setIsScroll(initScrollTop > 0);

        const handleScroll = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            setIsScroll(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <nav className={`header-section fixed left-0 top-0 z-50 w-full bg-white shadow flex justify-between items-center py-4 4xl:px-[175px] 2xl:px-[140px] lg:px-[100px] md:px-6 ${isScroll ? 'header-sticky shadow-[0px_16px_22px_-22px_rgba(242,247,251,1)' : ''}`}>
            <img src="/images/logo/logo-main.svg" alt='logo' className='h-10'/>
            <div className="flex space-x-2 lg:space-x-6 text-sm">
                {menu.map(item => {
                    const Icon = item.icon;
                    return (
                        <Link href={item.link} key={item.title}>
                        <div className={`header-icon font-medium text-[#2c2c2c] flex px-4 py-3 bg-white justify-center items-center rounded-lg ease-in-out transition duration-300 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 ${item.link === '/' ? (pathname === '/' ? 'active' : '') : (pathname.includes(item.link) ? 'active' : '' )}`}>
                            <Icon className='mr-2' />
                            <span>{item.title}</span>
                        </div>
                    </Link>
                    )
                })}
            </div>
            <UserDropdown />
        </nav>
    )
}
export default UserHeader