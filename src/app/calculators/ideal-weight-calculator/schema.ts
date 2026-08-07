import { z } from "zod";

export const ideal_weight_calculatorSchema = z.object({
  gender: z.string().optional(),
  heightCm: z.number().optional(),
});
