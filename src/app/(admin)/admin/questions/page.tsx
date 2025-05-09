import {
    DelimitedNumericArrayParam,
    NumberParam,
    StringParam,
    createEnumParam,
    decodeQueryParams,
} from 'serialize-query-params';
import { getExams, getQuestions } from "@/api/admin/fetches";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/api/queryKeys';
import Questions from '@/components/questions';
import { questionPramConfig } from '@/libs/params';

const QuestionPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
    const queryParams = decodeQueryParams(questionPramConfig, {
        pageSize: '10',
        pageIndex: '0',
        orderDirection: 'desc',
        ...searchParams,
    })
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QueryKeys.getQuestions, queryParams],
        queryFn: () => getQuestions(queryParams as any),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Questions />
        </HydrationBoundary>
    );
};

export default QuestionPage;