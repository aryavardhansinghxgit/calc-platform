import { z } from "zod";

export const ovulation_calculatorSchema = z.object({
  lastPeriod: z.string().optional(),
  cycleLength: z.number().optional(),
});
