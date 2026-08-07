import { z } from "zod";

export const pregnancy_weight_gain_calculatorSchema = z.object({
  preWeightKg: z.number().optional(),
  heightCm: z.number().optional(),
  week: z.number().optional(),
});
