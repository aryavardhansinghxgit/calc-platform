import { z } from "zod";

export const age_calculatorSchema = z.object({
  birthDate: z.string().optional(),
  targetDate: z.string().optional(),
});
