import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/queries/axios'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import { ApiStatusResponse } from '@/app/api/Api.types'
import { handleError } from '@/utils/handleError'

export const useApiStatus = () => {
    return useQuery<ApiStatusResponse>({
        queryKey: ['apiStatus'],
        queryFn: async (): Promise<ApiStatusResponse> => {
            const response = await axiosInstance.get('/Api/Status')
            return response.data
        },
        onError: handleError,
    })
}
