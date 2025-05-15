import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../queryKeys"
import { getAllClass, getExams, getQuestions, getStaff, getTeachers, getTopics, getUserInClass } from "./fetches"

export const useGetAllClass = (params = {}) => {
    return useQuery({
        queryKey: [QueryKeys.getAllClass, params],
        queryFn: () => getAllClass(params),
    })
}

export const useGetExams = (params: Record<string, string>) => {
    return useQuery({
        queryKey: [QueryKeys.getExams, params],
        queryFn: () => getExams(params),
        placeholderData: keepPreviousData
    })
}
export const useGetTopics = (params: Record<string, string>) => {
    return useQuery({
        queryKey: [QueryKeys.getTopics, params],
        queryFn: () => getTopics(params),
        placeholderData: keepPreviousData
    })
}

export const useGetQuestions = (params: Record<string, string>) => {
    return useQuery({
        queryKey: [QueryKeys.getQuestions, params],
        queryFn: () => getQuestions(params),
        placeholderData: keepPreviousData
    })
}

export const useGetTeachers = (params: Record<string, string>) => {
    return useQuery({
        queryKey: [QueryKeys.getTeachers, params],
        queryFn: () => getTeachers(params),
        placeholderData: keepPreviousData
    })
}

export const useGetStaff = (params: Record<string, string>) => {
    return useQuery({
        queryKey: [QueryKeys.getStaffs, params],
        queryFn: () => getStaff(params),
        placeholderData: keepPreviousData
    })
}

export const useGetStudent = (params: Record<string, string>) => {
    return useQuery({
        queryKey: [QueryKeys.getStudents, params],
        queryFn: () => getUserInClass(params),
        placeholderData: keepPreviousData
    })
}