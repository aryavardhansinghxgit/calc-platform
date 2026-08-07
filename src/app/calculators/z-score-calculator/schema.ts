import { z } from "zod";

export const z_score_calculatorSchema = z.object({
  rawScore: z.number().optional(),
  mean: z.number().optional(),
  sd: z.number().optional(),
});
