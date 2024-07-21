import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, "min message length is 10")
    .max(300, "max message length is 300"),
});
