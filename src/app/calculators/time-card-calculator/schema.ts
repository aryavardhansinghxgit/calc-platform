import { z } from "zod";

export const time_card_calculatorSchema = z.object({
  monHours: z.number().optional(),
  tueHours: z.number().optional(),
  wedHours: z.number().optional(),
  thuHours: z.number().optional(),
  friHours: z.number().optional(),
  hourlyRate: z.number().optional(),
});
