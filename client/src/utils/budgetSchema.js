import { z } from "zod";

export const budgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z
    .any()
    .refine(
      (val) =>
        val !== "" && val !== null && val !== undefined && !Number.isNaN(val),
      { message: "Amount is required" },
    )
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Amount must be greater than zero" })
    .refine((val) => val <= 1000000000, {
      message: "Amount cannot exceed ₹1,000,000,000",
    }),
});
