import { z } from "zod";

export const kidSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters long")
    .max(50, "First name cannot exceed 50 characters")
    .regex(
      /^[A-Z][a-zA-Z]*$/,
      "First name must start with a capital letter and contain only letters",
    ),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(3, "Last name must be at least 3 characters long")
    .max(49, "Last name cannot exceed 49 characters")
    .regex(
      /^[A-Z][a-zA-Z]*$/,
      "Last name must start with a capital letter and contain only letters",
    ),

  classId: z.string(),
});

export type KidFormValues = z.infer<typeof kidSchema>;
