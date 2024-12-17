import { z } from "zod";

export const updateUserSchema = z.object({
    name: z.string().nonempty("First name is required"),
    surname: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email address"),
});

export const updatePasswordSchema = z.object({
    oldPassword: z.string().nonempty("Old password is required"),
    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .nonempty("New password is required"),
    newPasswordConfirm: z
        .string()
        .nonempty("Password confirmation is required"),
}).refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "Passwords must match",
    path: ["newPasswordConfirm"],
});
