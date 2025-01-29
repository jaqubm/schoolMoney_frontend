import { z } from "zod";

const validateDateRange = z
  .object({
    startDate: z.string(),
    endDate: z.string(),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    now.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (start < now) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Start date cannot be earlier than today",
        path: ["startDate"],
      });
    }

    if (end < start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must be later than the start date",
        path: ["endDate"],
      });
    } else if (end.getTime() === start.getTime()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date cannot be the same as start date",
        path: ["endDate"],
      });
    }
  });

export const stepSchemas = [
  z.object({
    title: z
      .string()
      .trim()
      .min(1, "Fundraiser Name is required")
      .min(3, "Fundraiser Name must be at least 3 characters long")
      .max(255, "Fundraiser Name cannot exceed 255 characters")
      .regex(/^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s\-.]+$/, {
        message:
          "Fundraiser Name can only contain letters, numbers, spaces, hyphens, and periods",
      }),
    description: z
      .string()
      .trim()
      .min(1, "Fundraiser Description is required")
      .min(3, "Fundraiser Description must be at least 3 characters long")
      .max(200, "Fundraiser Description cannot exceed 200 characters")
      .regex(/^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s\-.]+$/, {
        message:
          "Fundraiser Description can only contain letters, numbers, spaces, hyphens, and periods",
      }),
    goalAmount: z
      .number()
      .positive("Goal must be a positive number")
      .min(30, "Goal must be at least 30")
      .max(10000, "Goal cannot exceed 10,000"),
    imageIndex: z
      .number()
      .nullable()
      .refine((val) => val !== null, {
        message: "You must select an image for your fundraiser.",
      }),
  }),
  z.object({
    classId: z.string().min(1, "Class ID is required"),
  }),
  validateDateRange,
];

export type StepSchema = (typeof stepSchemas)[number];
