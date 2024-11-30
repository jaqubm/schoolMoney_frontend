import axiosInstance from "@/app/api";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LoginFormValues } from "@/app/login/loginValidationRules";
import Cookies from "js-cookie";

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
		title: "Login failed",
		description: errorMessage,
		variant: "destructive",
	});
};

export const useLoginMutation = () => {
	return useMutation({
		mutationFn: async (data: LoginFormValues) => {
			const response = await axiosInstance.post("/Auth/Login", data);
			return response.data;
		},
		onSuccess: (data) => {
			toast({
				title: "Login successful",
				description: "Welcome back!",
			});

			if (data?.Token) {
				Cookies.set("access_token", data.Token, { expires: 1, secure: true });
			}
		},
		onError: handleError,
	});
};
