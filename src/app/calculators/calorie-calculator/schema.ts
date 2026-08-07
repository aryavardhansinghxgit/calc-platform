import { z } from "zod";

export const calorie_calculatorSchema = z.object({
  age: z.number().optional(),
  gender: z.string().optional(),
  weightKg: z.number().optional(),
  heightCm: z.number().optional(),
  activityLevel: z.string().optional(),
  goal: z.string().optional(),
});
