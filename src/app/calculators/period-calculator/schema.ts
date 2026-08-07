import { z } from "zod";

export const period_calculatorSchema = z.object({
  lastPeriod: z.string().optional(),
  cycleLength: z.number().optional(),
});
