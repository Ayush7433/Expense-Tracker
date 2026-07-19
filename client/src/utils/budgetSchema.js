import { z } from "zod";

export const budgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .positive("Amount must be greater than 0")
    .max(1000000000, "Amount is too large"),
});