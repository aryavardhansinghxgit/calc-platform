import { z } from "zod";

export const date_calculatorSchema = z.object({
  startDate: z.string().optional(),
  operation: z.string().optional(),
  years: z.number().optional(),
  months: z.number().optional(),
  days: z.number().optional(),
});
