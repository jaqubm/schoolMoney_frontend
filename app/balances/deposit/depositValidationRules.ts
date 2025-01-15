import { z } from "zod";

export const depositSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z
    .number()
    .min(1, "Amount must be at least 1")
    .nonnegative("Amount cannot be negative"),
  description: z.string().optional(),
});

export type DepositFormValues = z.infer<typeof depositSchema>;
