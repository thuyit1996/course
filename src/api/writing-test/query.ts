import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../queryKeys"
import { getAllAdminTopic } from "./fetches"

export const useGetAllAdminTopic = () => {
    return useQuery({
        queryKey: [QueryKeys.getAllAdminTopic],
        queryFn: () => getAllAdminTopic(),
    })
}