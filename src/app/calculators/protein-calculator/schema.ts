import { z } from "zod";

export const protein_calculatorSchema = z.object({
  weightKg: z.number().optional(),
  goal: z.string().optional(),
});
