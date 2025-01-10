import axios from 'axios'
import { toast } from '@/hooks/use-toast'

export const handleError = (error: unknown): void => {
    let errorMessage = 'An unexpected error occurred.'

    if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || errorMessage
    } else if (error instanceof Error) {
        errorMessage = error.message
    }

    toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
    })
}
