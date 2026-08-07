import { z } from "zod";

export const day_counter_calculatorSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
