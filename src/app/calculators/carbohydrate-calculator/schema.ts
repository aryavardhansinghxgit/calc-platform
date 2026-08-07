import { z } from "zod";

export const carbohydrate_calculatorSchema = z.object({
  dailyCalories: z.number().optional(),
  activityLevel: z.string().optional(),
});
