import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Minimum 8 character" }),
});

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(2, { message: "Minimum 2 character" }),
  password: z.string().min(8, { message: "Minimum 8 character" }),
});
