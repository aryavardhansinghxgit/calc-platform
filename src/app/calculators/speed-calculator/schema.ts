import { z } from "zod";

export const speed_calculatorSchema = z.object({
  distanceKm: z.number().optional(),
  timeHours: z.number().optional(),
});
