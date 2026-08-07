import { z } from "zod";

export const mileage_calculatorSchema = z.object({
  distanceMiles: z.number().optional(),
  irsRate: z.number().optional(),
});
