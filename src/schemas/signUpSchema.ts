import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "min length for username is 2")
  .max(20, "max length for username is 20")
  .regex(/^[a-zA-Z0-9_]+$/, "username should not contain special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(6, { message: "min password length is 6" }),
});
