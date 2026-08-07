import { z } from "zod";

export const target_heart_rate_calculatorSchema = z.object({
  age: z.number().optional(),
  restingHR: z.number().optional(),
});
