import { z } from "zod";

export const one_rep_max_calculatorSchema = z.object({
  weightLiftedKg: z.number().optional(),
  reps: z.number().optional(),
});
