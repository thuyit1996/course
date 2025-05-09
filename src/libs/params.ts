import queryString from 'query-string';
import { DecodedValueMap, encodeQueryParams, QueryParamConfigMap } from 'serialize-query-params';
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
