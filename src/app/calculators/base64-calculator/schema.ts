import { z } from "zod";

export const base64_calculatorSchema = z.object({
  text: z.string().optional(),
  mode: z.string().optional(),
});
