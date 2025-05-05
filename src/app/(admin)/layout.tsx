'use client';
import Header from "@/components/admin-header"
import MobileMenu from "@/components/mobile-menu";
import Sidebar from "@/components/sidebar"
import React, { useState } from "react"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return <div className="bg-[#fffaf5] md:p-4">
             <Sidebar />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <Header onMenuClick={() => setIsMenuOpen(true)} />
                {children}
    </div>
}
export default AdminLayout