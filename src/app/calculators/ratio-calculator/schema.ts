import { z } from "zod";

export const ratio_calculatorSchema = z.object({
  valA: z.number().optional(),
  valB: z.number().optional(),
  valC: z.number().optional(),
});
