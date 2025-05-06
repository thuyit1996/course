import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../queryKeys"
import { getAllClass } from "./fetches"

export const useGetAllClass = () => {
    return useQuery({
        queryKey: [QueryKeys.getAllClass],
        queryFn: () => getAllClass(),
    })
}