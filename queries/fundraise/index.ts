import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/queries/axios";
import { toast } from "@/hooks/use-toast";
import {
  CreateFundraisePayload,
  UpdateFundraisePayload,
  FundraiseDetails, WithdrawFundraisePayload,
} from "@/app/fundraise/Fundraise.types";
import { handleError } from "@/utils/handleError";
import {TransactionDetails, TransferPayload} from "@/app/transaction/Transaction.types";

export const useCreateFundraise = () => {
  return useMutation({
    mutationFn: async (data: CreateFundraisePayload): Promise<void> => {
      await axiosInstance.post("/Fundraise/Create", data);
    },
    onSuccess: () => {
      toast({
        title: "Fundraiser created",
        description: "Your fundraiser has been successfully created.",
      });
    },
    onError: handleError,
  });
};

export const useGetFundraiseById = (fundraiseId: string | string[]) => {
  return useQuery<FundraiseDetails>({
    queryKey: ["fundraise", fundraiseId],
    queryFn: async (): Promise<FundraiseDetails> => {
      const response = await axiosInstance.get(`/Fundraise/Get/${fundraiseId}`);
      return response.data;
    },
    onError: handleError,
  });
};

export const useUpdateFundraise = () => {
  return useMutation({
    mutationFn: async ({
      fundraiseId,
      data,
    }: {
      fundraiseId: string;
      data: UpdateFundraisePayload;
    }): Promise<void> => {
      await axiosInstance.put(`/Fundraise/Update/${fundraiseId}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Fundraiser updated",
        description: "Your fundraiser has been successfully updated.",
      });
    },
    onError: handleError,
  });
};

export const useDeleteFundraise = () => {
  return useMutation({
    mutationFn: async ({
      fundraiseId,
    }: {
      fundraiseId: string;
    }): Promise<void> => {
      await axiosInstance.delete(`/Fundraise/Delete/${fundraiseId}`);
    },
    onSuccess: () => {
      toast({
        title: "Fundraiser deleted",
        description: "Your fundraiser has been successfully deleted.",
      });
    },
    onError: handleError,
  });
};

export const useWithdrawFromFundraise = () => {
  return useMutation({
    mutationFn: async ({
      fundraiseId,
      data
    }: {
      fundraiseId: string;
      data: WithdrawFundraisePayload
    }): Promise<void> => {
      await axiosInstance.put(`/Fundraise/Withdraw/${fundraiseId}`, data);
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

export const useGetTransactionHistory = (fundraiseId: string | string[]) => {
  return useQuery<TransactionDetails[]>({
    queryKey: ["fundraiseTransactionHistory", fundraiseId],
    queryFn: async (): Promise<TransactionDetails[]> => {
      const response = await axiosInstance.get(
        `/Fundraise/GetTransactionHistory/${fundraiseId}`,
      );
      return response.data;
    },
    onError: handleError,
  });
};
