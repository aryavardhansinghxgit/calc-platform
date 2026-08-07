import { z } from "zod";

export const army_body_fat_calculatorSchema = z.object({
  gender: z.string().optional(),
  age: z.string().optional(),
  heightCm: z.number().optional(),
  neckCm: z.number().optional(),
  waistCm: z.number().optional(),
  hipCm: z.number().optional(),
});
