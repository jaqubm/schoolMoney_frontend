import { z } from "zod";

// export const stepSchemas = [
//   z.object({
//     title: z.string().min(1, "Fundraiser Name is required"),
//     description: z.string().min(1, "Fundraiser Description is required"),
//     goalAmount: z.number().positive("Goal must be a positive number"),
//   }),
//   z.object({
//     classId: z.string().min(1, "Class ID is required"),
//   }),
//   z.object({
//     startDate: z.string().min(1, "Start Date is required"),
//     endDate: z.string().min(1, "End Date is required"),
//   }),
// ];

export const stepSchemas = z.object({
  title: z.string().min(1, "Fundraiser Name is required"),
  description: z.string().min(1, "Fundraiser Description is required"),
  // goalAmount: z.number().positive("Goal must be a positive number"),
  goalAmount: z.string().min(1, "Fundraiser Name is required"),
});
