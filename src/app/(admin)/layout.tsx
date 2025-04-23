import React from "react"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-[#fffaf5] md:p-4">
        {children}
    </div>
}
export default AdminLayout