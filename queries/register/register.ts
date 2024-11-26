import axiosInstance from "@/app/api";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { RegisterBody } from "@/app/register/Register.types";
import axios from "axios";

const handleError = (error: unknown) => {
  let errorMessage = "An unexpected error occurred.";

  if (axios.isAxiosError(error)) {
    if (error.response?.data) {
      errorMessage =
        typeof error.response.data === "string"
          ? error.response.data
          : "An unexpected error occurred.";
    } else if (error.message) {
      errorMessage = error.message;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  toast({
    title: "Registration failed",
    description: errorMessage,
    variant: "destructive",
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: RegisterBody) => {
      const response = await axiosInstance.post("/Auth/Register", data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Registration successful",
        description: "You can now log in.",
      });
    },
    onError: handleError,
  });
};
