import { z } from "zod";

export const quadratic_formula_calculatorSchema = z.object({
  coeffA: z.number().optional(),
  coeffB: z.number().optional(),
  coeffC: z.number().optional(),
});
