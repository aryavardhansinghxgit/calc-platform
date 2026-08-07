import { z } from "zod";

export const pace_calculatorSchema = z.object({
  distanceKm: z.number().optional(),
  timeHours: z.number().optional(),
  timeMinutes: z.number().optional(),
  timeSeconds: z.number().optional(),
});
