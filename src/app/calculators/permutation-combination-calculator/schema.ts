import { z } from "zod";

export const permutation_combination_calculatorSchema = z.object({
  nVal: z.number().optional(),
  rVal: z.number().optional(),
});
