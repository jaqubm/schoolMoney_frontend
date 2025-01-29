import { z } from "zod";

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, { message: "First name is required" })
    .min(3, {
      message: "First name must be at least 3 characters long",
    })
    .max(100, { message: "First name cannot exceed 100 characters" })
    .regex(/^[A-Z][a-zA-Z]*$/, {
      message:
        "First name must start with a capital letter and contain only letters",
    }),
  surname: z
    .string()
    .min(1, { message: "Surname is required" })
    .min(3, { message: "Surname must be at least 3 characters long" })
    .max(100, { message: "Surname cannot exceed 100 characters" })
    .regex(/^[A-Z][a-zA-Z]*$/, {
      message:
        "Surname must start with a capital letter and contain only letters",
    }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
});

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .min(1, "New password is required"),
    newPasswordConfirm: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "Passwords must match",
    path: ["newPasswordConfirm"],
  });
