import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/queries/axios";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import {
    WithdrawPayload,
    DepositPayload,
    TransferPayload,
    TransactionDetails,
} from "@/app/transaction/Transaction.types";
import { handleError } from "@/utils/handleError";

export const useWithdraw = () => {
    return useMutation({
        mutationFn: async (data: WithdrawPayload): Promise<void> => {
            await axiosInstance.post("/Transaction/Withdraw", data);
        },
        onSuccess: () => {
            toast({
                title: "Withdrawal successful",
                description: "The amount has been successfully withdrawn.",
            });
        },
        onError: handleError,
    });
};

export const useDeposit = () => {
    return useMutation({
        mutationFn: async (data: DepositPayload): Promise<void> => {
            await axiosInstance.post("/Transaction/Deposit", data);
        },
        onSuccess: () => {
            toast({
                title: "Deposit successful",
                description: "The amount has been successfully deposited.",
            });
        },
        onError: handleError,
    });
};

export const useTransfer = () => {
    return useMutation({
        mutationFn: async (data: TransferPayload): Promise<void> => {
            await axiosInstance.post("/Transaction/Transfer", data);
        },
        onSuccess: () => {
            toast({
                title: "Transfer successful",
                description: "The amount has been successfully transferred.",
            });
        },
        onError: handleError,
    });
};

export const useGetTransactionById = (transactionId: string) => {
    return useQuery<TransactionDetails>({
        queryKey: ["transaction", transactionId],
        queryFn: async (): Promise<TransactionDetails> => {
            const response = await axiosInstance.get(
                `/Transaction/Get/${transactionId}`
            );
            return response.data;
        },
        onError: handleError,
    });
};
