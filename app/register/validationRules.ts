import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "First name is required" })
      .min(3, {
        message: "First name must be at least 3 characters long",
      })
      .max(20, { message: "First name cannot exceed 20 characters" })
      .regex(/^[A-Z][a-zA-Z]*$/, {
        message:
          "First name must start with a capital letter and contain only letters",
      }),
    surname: z
      .string()
      .min(1, { message: "Surname is required" })
      .min(3, { message: "Surname must be at least 3 characters long" })
      .max(30, { message: "Surname cannot exceed 30 characters" })
      .regex(/^[A-Z][a-zA-Z]*$/, {
        message:
          "Surname must start with a capital letter and contain only letters",
      }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
    passwordConfirm: z
      .string()
      .min(1, { message: "Repeated password is required" }),
    termsAndConditions: z.boolean().refine((value) => value, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type RegisterBody = z.infer<typeof registerSchema>;
