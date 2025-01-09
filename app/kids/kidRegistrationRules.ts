import { z } from "zod";

export const registerKidSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	school: z.string().min(1, "School is required"),
	class: z.string().min(1, "Class is required"),
	dateOfBirth: z.string().min(1, "Date of Birth is required"),
	terms: z.boolean().refine((val) => val, "You must accept the terms and conditions"),
});