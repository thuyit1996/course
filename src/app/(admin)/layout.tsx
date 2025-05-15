import React, { Suspense } from "react"
import AdminContainer from "../containers/AdminContainer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";
import { ACCESS_ADMIN_SITE_ROLES, ROLES } from "@/libs/constant";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/api/queryKeys";
import { getAllClass } from "@/api/admin/fetches";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions);
    if (session && !ACCESS_ADMIN_SITE_ROLES.some(role => session.user?.roles.includes(role))) {
        return redirect('/');
    }
    console.log(session);
    const classParams = {
        ...(session?.user?.roles.includes(ROLES.TEACHER) && {
            teacherId: session.user.userId
        }),
        ...(session?.user?.roles.includes(ROLES.STAFF) && {
            staffId: session.user.userId
        }),
    }
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QueryKeys.getAllClass, classParams],
        queryFn: () => getAllClass(classParams),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AdminContainer>
                <Suspense>
                    {children}
                </Suspense>
            </AdminContainer>

        </HydrationBoundary>
    )
}
export default AdminLayout