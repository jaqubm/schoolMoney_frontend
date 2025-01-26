import { z } from "zod";

export const createClassSchema = z.object({
    name: z
        .string()
        .min(1, "Class name is required")
        .max(50, "Class name cannot exceed 50 characters"),
    schoolName: z
        .string()
        .min(1, "School name is required")
        .max(100, "School name cannot exceed 100 characters"),
});

export type CreateClassFormValues = z.infer<typeof createClassSchema>;
