import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/queries/axios";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import {
    RegisterPayload,
    LoginPayload,
    UpdatePasswordPayload,
    AuthResponse,
} from "@/app/auth/Auth.types";
import { handleError } from "@/utils/handleError";

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: RegisterPayload): Promise<void> => {
            await axiosInstance.post("/Auth/Register", data);
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

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginPayload): Promise<AuthResponse> => {
            const response = await axiosInstance.post("/Auth/Login", data);
            return response.data;
        },
        onSuccess: (data) => {
            toast({
                title: "Login successful",
                description: "You are now logged in.",
            });
        },
        onError: handleError,
    });
};

export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: async (data: UpdatePasswordPayload): Promise<void> => {
            await axiosInstance.put("/Auth/UpdatePassword", data);
        },
        onSuccess: () => {
            toast({
                title: "Password updated",
                description: "Your password has been successfully updated.",
            });
        },
        onError: handleError,
    });
};
