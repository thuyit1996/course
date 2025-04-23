import React from 'react';

import CountdownTimer from '@/components/count-down';
import UserHeader from '@/components/user-header';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-[#f2f3f7] min-h-screen font-sans">
            <UserHeader/>
            {children}
           
        </div>
    )
}
export default UserLayout;