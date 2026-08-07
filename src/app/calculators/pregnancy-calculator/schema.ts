import { z } from "zod";

export const pregnancy_calculatorSchema = z.object({
  lmpDate: z.string().optional(),
  cycleLength: z.number().optional(),
});
