import axiosInstance from '@/queries/axios'
import { useQuery } from '@tanstack/react-query'
import { ClassDetailsResponse, ClassSearchResult } from '@/app/classes/classes'

export const fetchClassesByName = async (
    className: string
): Promise<ClassSearchResult[]> => {
    const { data } = await axiosInstance.get(`/Class/Search/${className}`)
    return data
}

export const fetchClassById = async (
    classId: string
): Promise<ClassDetailsResponse> => {
    const { data } = await axiosInstance.get(`/Class/Get/${classId}`)
    return data
}

export const useFetchClassesByName = (className: string) => {
    return useQuery<ClassSearchResult[]>({
        queryFn: () => fetchClassesByName(className),
        queryKey: ['classesData', className],
        enabled: className.length > 0,
    })
}

export const useFetchClassById = (classId: string) => {
    return useQuery<ClassDetailsResponse>(
        ['classData', classId],
        () => fetchClassById(classId),
        {
            enabled: !!classId,
        }
    )
}
