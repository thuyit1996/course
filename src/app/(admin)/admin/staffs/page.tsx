import {
    DelimitedNumericArrayParam,
    NumberParam,
    StringParam,
    createEnumParam,
    decodeQueryParams,
} from 'serialize-query-params';
import { getStaff } from "@/api/admin/fetches";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/api/queryKeys';
import Staffs from '@/components/staffs';
import { staffPramConfig } from '@/libs/params';

const StaffsPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
    const queryParams = decodeQueryParams(staffPramConfig, {
        pageSize: '10',
        pageIndex: '0',
        orderBy: 'userId',
        orderDirection: 'desc',
        roles: 'ROLE_STAFF',
        ...searchParams,
    })
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QueryKeys.getStaffs, queryParams],
        queryFn: () => getStaff(queryParams as any),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Staffs />
        </HydrationBoundary>
    );
};

export default StaffsPage;