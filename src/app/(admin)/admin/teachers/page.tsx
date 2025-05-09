import {
    DelimitedNumericArrayParam,
    NumberParam,
    StringParam,
    createEnumParam,
    decodeQueryParams,
} from 'serialize-query-params';
import { getTeachers } from "@/api/admin/fetches";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/api/queryKeys';
import Teachers from '@/components/teachers';
import { teacherPramConfig } from '@/libs/params';

const TeachersPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
    const queryParams = decodeQueryParams(teacherPramConfig, {
        pageSize: '10',
        pageIndex: '0',
        orderBy: 'userId',
        orderDirection: 'desc',
        roles: 'ROLE_TEACHER',
        ...searchParams,
    })
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QueryKeys.getTeachers, queryParams],
        queryFn: () => getTeachers(queryParams as any),
    });
    // const resp = await getExams();
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Teachers />
        </HydrationBoundary>
    );
};

export default TeachersPage;