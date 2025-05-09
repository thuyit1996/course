import {
    DelimitedNumericArrayParam,
    NumberParam,
    StringParam,
    createEnumParam,
    decodeQueryParams,
} from 'serialize-query-params';
import { getExams } from "@/api/admin/fetches";
import Exams from "@/components/exams";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/api/queryKeys';
import { examPramConfig } from '@/libs/params';

const ExamPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
    const queryParams = decodeQueryParams(examPramConfig, {
        pageSize: '10',
        pageIndex: '0',
        orderBy: 'createdDate',
        orderDirection: 'desc',
        ...searchParams,
    })
    console.log("serever", queryParams);
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QueryKeys.getExams, queryParams],
        queryFn: () => getExams(queryParams as any),
    });
    // const resp = await getExams();
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Exams />
        </HydrationBoundary>
    );
};

export default ExamPage;