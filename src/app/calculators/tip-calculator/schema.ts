import { z } from "zod";

export const tip_calculatorSchema = z.object({
  billAmount: z.number().optional(),
  tipPct: z.number().optional(),
  peopleCount: z.number().optional(),
});
