import { z } from "zod";

export const time_duration_calculatorSchema = z.object({
  startDate: z.string().optional(),
  startTime: z.string().optional(),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
});
