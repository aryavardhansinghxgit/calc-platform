import { z } from "zod";

export const calories_burned_calculatorSchema = z.object({
  activity: z.string().optional(),
  weightKg: z.number().optional(),
  durationMins: z.number().optional(),
});
