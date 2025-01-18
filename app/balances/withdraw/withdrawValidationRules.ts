import { z } from "zod";

export const withdrawSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z
    .number()
    .min(1, "Amount must be at least 1")
    .nonnegative("Amount cannot be negative"),
  accountNumber: z.string().min(12, "Account number must have 12 digits"),
});

export type WithdrawFormValues = z.infer<typeof withdrawSchema>;
