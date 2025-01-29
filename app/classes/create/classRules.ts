import { z } from "zod";

export const classSchema = z.object({
  name: z
    .string()
    .min(1, "Class name is required")
    .max(100, "Class name cannot exceed 100 characters"),
  schoolName: z
    .string()
    .min(1, "School name is required")
    .max(100, "School name cannot exceed 100 characters"),
});

export type ClassFormValues = z.infer<typeof classSchema>;
