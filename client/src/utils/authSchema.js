import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(3, "Name must contain at least 3 characters")
      .max(50, "Name must be less than 50 characters"),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .max(100, "Email must be less than 100 characters"),

    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    //   .regex(
    //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
    //     "Password must contain uppercase, lowercase and a number",
    //   ),

    confirmPassword: z.string().trim().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
