import { z } from "zod";

export const expenseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(50, "Title cannot exceed 50 characters"),
    amount: z
        .any()
        .refine(
            (val) => val !== "" && val !== null && val !== undefined && !Number.isNaN(val),
            { message: "Amount is required" }
        )
        .transform((val) => Number(val))
        .refine((val) => val > 0, { message: "Amount must be greater than zero" })
        .refine((val) => val <= 1000000000, { message: "Amount cannot exceed ₹1,000,000,000" }),
    category: z
        .string()
        .trim()
        .min(1, "Category is required")
        .max(50, "Category cannot exceed 50 characters"),
    expenseDate: z
        .string()
        .min(1, "Expense date is required"),
    description: z
        .string()
        .max(200, "Description cannot exceed 200 characters")
        .optional()
        .nullable(), // optional string
});