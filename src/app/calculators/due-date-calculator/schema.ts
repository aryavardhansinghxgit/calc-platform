import { z } from "zod";

export const due_date_calculatorSchema = z.object({
  lmpDate: z.string().optional(),
  cycleLength: z.number().optional(),
});
