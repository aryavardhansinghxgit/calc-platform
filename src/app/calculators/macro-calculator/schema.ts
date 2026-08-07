import { z } from "zod";

export const macro_calculatorSchema = z.object({
  dailyCalories: z.number().optional(),
  dietRatio: z.string().optional(),
});
