import { z } from "zod";

export const shoe_size_calculatorSchema = z.object({
  footCm: z.number().optional(),
  gender: z.string().optional(),
});
