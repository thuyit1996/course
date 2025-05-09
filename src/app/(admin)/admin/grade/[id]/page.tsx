import { getUserInClass } from '@/api/admin/fetches';
import { QueryKeys } from '@/api/queryKeys';
import Students from '@/components/students';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';
import { decodeQueryParams, NumberParam, StringParam } from 'serialize-query-params';
export const studentPramConfig = {
    pageSize: NumberParam,
    pageIndex: NumberParam,
    orderDirection: StringParam,
    orderBy: StringParam,
    classroomIds: StringParam
}
const GradePage = async ({ params, searchParams }: { params: { id: string }, searchParams: Record<string, string> }) => {
    const queryParams = decodeQueryParams(studentPramConfig, {
        pageSize: '10',
        pageIndex: '0',
        orderBy: 'userId',
        orderDirection: 'desc',
        classroomIds: params.id,
        ...omit(searchParams, 'grade'),
    })
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QueryKeys.getStudents, queryParams],
        queryFn: () => getUserInClass(queryParams as any),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {/* <Exams /> */}
            <Students gradeId={params.id} />
        </HydrationBoundary>
    );
};

export default GradePage;