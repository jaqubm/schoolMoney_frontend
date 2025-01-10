import { useMutation, useQuery } from '@tanstack/react-query'
import axiosInstance from '@/queries/axios'
import { toast } from '@/hooks/use-toast'

import {
    User,
    Child,
    ClassDetails,
    FundraiseDetails,
    TransactionDetails,
    UpdateUserPayload,
    CreateChildPayload,
    UpdateChildPayload,
} from '@/app/user/User.types'
import { handleError } from '@/utils/handleError'

export const useUserData = () => {
    return useQuery<User>({
        queryKey: ['userData'],
        queryFn: async (): Promise<User> => {
            const response = await axiosInstance.get('/User/Get')
            return response.data
        },
        onError: handleError,
    })
}

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: async (data: UpdateUserPayload): Promise<void> => {
            await axiosInstance.put('/User/Update', data)
        },
        onSuccess: () => {
            toast({
                title: 'User updated',
                description: 'Your profile has been successfully updated.',
            })
        },
        onError: handleError,
    })
}

export const useCreateChildProfile = () => {
    return useMutation({
        mutationFn: async (data: CreateChildPayload): Promise<Child> => {
            const response = await axiosInstance.post(
                '/User/CreateChildProfile',
                data
            )
            return response.data
        },
        onSuccess: () => {
            toast({
                title: 'Child profile created',
                description: 'The child profile has been successfully created.',
            })
        },
        onError: handleError,
    })
}

export const useGetChildProfile = (childId: string) => {
    return useQuery<Child>({
        queryKey: ['childProfile', childId],
        queryFn: async (): Promise<Child> => {
            const response = await axiosInstance.get(
                `/User/GetChildProfile/${childId}`
            )
            return response.data
        },
        onError: handleError,
    })
}

export const useUpdateChildProfile = () => {
    return useMutation({
        mutationFn: async ({
            childId,
            data,
        }: {
            childId: string
            data: UpdateChildPayload
        }): Promise<void> => {
            await axiosInstance.put(`/User/UpdateChildProfile/${childId}`, data)
        },
        onSuccess: () => {
            toast({
                title: 'Child profile updated',
                description: 'The child profile has been successfully updated.',
            })
        },
        onError: handleError,
    })
}

export const useDeleteChildProfile = () => {
    return useMutation({
        mutationFn: async (childId: string): Promise<void> => {
            await axiosInstance.delete(`/User/DeleteChildProfile/${childId}`)
        },
        onSuccess: () => {
            toast({
                title: 'Child profile deleted',
                description: 'The child profile has been successfully deleted.',
            })
        },
        onError: handleError,
    })
}

export const useGetClasses = () => {
    return useQuery<ClassDetails[]>({
        queryKey: ['classes'],
        queryFn: async (): Promise<ClassDetails[]> => {
            const response = await axiosInstance.get('/User/GetClasses')
            return response.data
        },
        onError: handleError,
    })
}

export const useGetFundraises = () => {
    return useQuery<FundraiseDetails[]>({
        queryKey: ['fundraises'],
        queryFn: async (): Promise<FundraiseDetails[]> => {
            const response = await axiosInstance.get('/User/GetFundraises')
            return response.data
        },
        onError: handleError,
        // onSuccess: (data) => {
        //   toast({
        //     title: "Success",
        //     description: `Successfully fetched ${data.length} fundraises!`,
        //   });
        // },
    })
}

export const useGetTransactionHistory = () => {
    return useQuery<TransactionDetails[]>({
        queryKey: ['transactionHistory'],
        queryFn: async (): Promise<TransactionDetails[]> => {
            const response = await axiosInstance.get(
                '/User/GetTransactionHistory'
            )
            return response.data
        },
        onError: handleError,
    })
}
