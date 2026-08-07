import { z } from "zod";

export const hours_calculatorSchema = z.object({
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  breakMins: z.number().optional(),
});
