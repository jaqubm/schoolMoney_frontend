import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(20, { message: "First name cannot exceed 20 characters" })
    .regex(/^[A-Z][a-zA-Z]*$/, {
      message:
        "First name must start with a capital letter and contain only letters",
    })
    .nonempty({ message: "First name is required" }),
  surname: z
    .string()
    .min(2, { message: "Surname must be at least 2 characters long" })
    .max(30, { message: "Surname cannot exceed 30 characters" })
    .regex(/^[A-Z][a-zA-Z]*$/, {
      message:
        "Surname must start with a capital letter and contain only letters",
    })
    .nonempty({ message: "Surname is required" }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .nonempty({ message: "Password is required" }),
  repeatedPassword: z
    .string()
    .nonempty({ message: "Repeated password is required" }),
  // .refine((value, context) => value === context.parent.password, {
  //   message: "Passwords do not match",
  // }),
  termsAndConditions: z.boolean().refine((value) => value, {
    message: "You must accept the terms and conditions",
  }),
});

export type RegisterBody = z.infer<typeof registerSchema>;
