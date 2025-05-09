import React, { Suspense } from "react"
import AdminContainer from "../containers/AdminContainer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions);
    if(session && !session.user?.roles?.includes("ROLE_ADMIN")) {
        return redirect('/');
    }
    return (
        <AdminContainer>
            <Suspense>
                {children}
            </Suspense>
        </AdminContainer>
    )
}
export default AdminLayout