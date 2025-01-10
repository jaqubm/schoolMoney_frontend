import { z } from 'zod'

const validateDateRange = z
    .object({
        startDate: z.string(),
        endDate: z.string(),
    })
    .superRefine(({ startDate, endDate }, ctx) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const now = new Date()

        if (start < now) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Start date cannot be earlier than today',
                path: ['startDate'],
            })
        }

        if (end < start) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'End date cannot be earlier than start date',
                path: ['endDate'],
            })
        }
    })

export const stepSchemas = [
    z.object({
        title: z
            .string()
            .trim()
            .min(1, 'Fundraiser Name is required')
            .min(3, 'Fundraiser Name must be at least 3 characters long')
            .max(50, 'Fundraiser Name cannot exceed 50 characters')
            .regex(/^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s-]+$/, {
                message:
                    'Fundraiser Name can only contain letters, numbers, spaces, and hyphens',
            }),
        description: z
            .string()
            .trim()
            .min(1, 'Fundraiser Description is required')
            .min(3, 'Fundraiser Description must be at least 3 characters long')
            .max(200, 'Fundraiser Description cannot exceed 50 characters')
            .regex(/^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s-]+$/, {
                message:
                    'Fundraiser Description can only contain letters, numbers, spaces, and hyphens',
            }),
        goalAmount: z.number().positive('Goal must be a positive number'),
        imageIndex: z
            .number()
            .nullable()
            .refine((val) => val !== null, {
                message: 'You must select an image for your fundraiser.',
            }),
    }),
    z.object({
        classId: z.string().min(1, 'Class ID is required'),
    }),
    validateDateRange,
]

export type StepSchema = (typeof stepSchemas)[number]
