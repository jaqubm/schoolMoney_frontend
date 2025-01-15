import { z } from "zod";

export const registerKidSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  classId: z.string().min(1, "Class is required"),
});

export type RegisterFormValues = z.infer<typeof registerKidSchema>;
