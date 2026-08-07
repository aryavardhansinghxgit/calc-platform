import { z } from "zod";

export const body_fat_calculatorSchema = z.object({
  gender: z.string().optional(),
  weightKg: z.number().optional(),
  heightCm: z.number().optional(),
  neckCm: z.number().optional(),
  waistCm: z.number().optional(),
  hipCm: z.number().optional(),
});
