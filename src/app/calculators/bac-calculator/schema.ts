import { z } from "zod";

export const bac_calculatorSchema = z.object({
  gender: z.string().optional(),
  weightKg: z.number().optional(),
  drinksCount: z.number().optional(),
  hoursSinceFirst: z.number().optional(),
});
