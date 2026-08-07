import { z } from "zod";

export const fat_intake_calculatorSchema = z.object({
  dailyCalories: z.number().optional(),
  fatPercent: z.number().optional(),
});
