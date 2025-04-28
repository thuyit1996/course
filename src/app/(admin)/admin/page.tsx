'use client'
import Header from '@/components/admin-header';
import MobileMenu from '@/components/mobile-menu';
import Sidebar from '@/components/sidebar';
import Teachers from '@/components/teachers';
import Button from '@/components/ui/button/Button';
import PlusIcon from '@/public/images/icons/plus.svg';
import React, { useState } from 'react';

const Dashboard: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <Sidebar />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <Header onMenuClick={() => setIsMenuOpen(true)} />
            <main className="md:ml-[288px]">
                <div className='shadow rounded-3xl bg-white  h-[calc(100vh-2rem)]'>
                    <div className='flex justify-between px-6 py-4'>
                        <div className='flex items-center'>
                            <span className='text-semibold text-lg'>Teacher list</span>
                            <div className='border rounded-2xl ml-3 border-gray-200 text-[#2c2c2c] text-sm text-center px-2 py-1 text-medium'>100 teachers</div>
                        </div>
                        <Button variant='primary' startIcon={<PlusIcon className="fill-rose-600" />}>Add teacher</Button>
                    </div>
                    <div className=''>
                        <Teachers />
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;