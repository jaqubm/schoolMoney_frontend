import { z } from "zod";

export const depositSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title can have a maximum of 50 characters"),
  amount: z
    .number()
    .min(1, "Amount must be at least 1")
    .nonnegative("Amount cannot be negative"),
  sourceAccountNumber: z.string(),
});

export type DepositFormValues = z.infer<typeof depositSchema>;
