import {
    NumberParam,
    StringParam,
    decodeQueryParams,
} from 'serialize-query-params';
import { getTopics } from "@/api/admin/fetches";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/api/queryKeys';
import Topics from '@/components/topics';
import { topicsPramConfig } from '@/libs/params';

const TopicsPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
    const queryParams = decodeQueryParams(topicsPramConfig, {
        pageSize: '10',
        pageIndex: '0',
        orderDirection: 'desc',
        ...searchParams,
    })
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QueryKeys.getTopics, queryParams],
        queryFn: () => getTopics(queryParams as any),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Topics />
        </HydrationBoundary>
    );
};

export default TopicsPage;