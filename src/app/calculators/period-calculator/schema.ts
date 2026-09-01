import { z } from "zod";

export const period_calculatorSchema = z.object({
  lmpDate: z.string().optional(),
  lastPeriod: z.string().optional(),
  periodLength: z.number().optional(),
  cycleLength: z.number().optional(),
  userAge: z.number().optional(),
  lutealPhaseLength: z.number().optional(),
  cycleRegularity: z.string().optional(),
  birthControl: z.string().optional(),
  hasPcos: z.boolean().optional(),
});
