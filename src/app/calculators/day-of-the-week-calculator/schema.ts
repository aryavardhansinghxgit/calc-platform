import { z } from "zod";

export const day_of_the_week_calculatorSchema = z.object({
  targetDate: z.string().optional(),
});
