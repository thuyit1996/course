import queryString from 'query-string';
import { DecodedValueMap, encodeQueryParams, NumberParam, QueryParamConfigMap, StringParam } from 'serialize-query-params';
export const parseSearchParams = (search: string | URLSearchParams) => {
    if (typeof search === 'string') {
        return queryString.parse(search);
    }
    return queryString.parse(search.toString());
};

export const createQueryString = <QPCMap extends QueryParamConfigMap>(
  paramConfigMap: QPCMap,
  query: Partial<DecodedValueMap<QPCMap>>
) => queryString.stringify(encodeQueryParams(paramConfigMap, query));

export const examPramConfig = {
    pageSize: NumberParam,
    pageIndex: NumberParam,
    orderDirection: StringParam,
    orderBy: StringParam
}

export const teacherPramConfig = {
    pageSize: NumberParam,
    pageIndex: NumberParam,
    orderDirection: StringParam,
    orderBy: StringParam,
    roles: StringParam
}

export const studentPramConfig = {
    pageSize: NumberParam,
    pageIndex: NumberParam,
    orderDirection: StringParam,
    orderBy: StringParam,
    classroomIds: StringParam
}

export const questionPramConfig = {
    pageSize: NumberParam,
    pageIndex: NumberParam,
    orderDirection: StringParam,
}

export const staffPramConfig = {
    pageSize: NumberParam,
    pageIndex: NumberParam,
    orderDirection: StringParam,
    orderBy: StringParam,
    roles: StringParam
}
export const topicsPramConfig = {
    pageSize: NumberParam,
    pageIndex: NumberParam,
    orderDirection: StringParam,
}