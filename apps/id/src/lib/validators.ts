import { z } from "zod";

export const RegisterSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and numbers"
    ),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const ProfileSchema = z.object({
  fullName: z.string().min(2, "Full name required").optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  birthDate: z.string().datetime().optional(),
  birthTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)")
    .optional(),
  birthTimezone: z.string().optional(),
  birthLocation: z.string().optional(),
});

export type ProfileInput = z.infer<typeof ProfileSchema>;
