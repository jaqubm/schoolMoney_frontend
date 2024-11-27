import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFundraiser,
  getFundraiserById,
  updateFundraiser,
} from "@/app/api/fundraise";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const handleError = (error: unknown) => {
  let errorMessage = "An unexpected error occurred.";

  if (axios.isAxiosError(error) && error.response) {
    errorMessage = error.response.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  toast({
    title: "Error",
    description: errorMessage,
    variant: "destructive",
  });
};

export const useCreateFundraiser = () => {
  return useMutation({
    mutationFn: createFundraiser,
    onSuccess: () => {
      toast({
        title: "Fundraiser created",
        description: "Your fundraiser has been successfully created.",
      });
    },
    onError: handleError,
  });
};

export const useGetFundraiserById = (fundraiserId: string) => {
  return useQuery(["fundraiser", fundraiserId], () =>
    getFundraiserById(fundraiserId),
  );
};

export const useUpdateFundraiser = () => {
  return useMutation({
    mutationFn: updateFundraiser,
    onSuccess: () => {
      toast({
        title: "Fundraiser updated",
        description: "Your fundraiser has been successfully updated.",
      });
    },
    onError: handleError,
  });
};
