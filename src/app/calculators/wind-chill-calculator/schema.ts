import { z } from "zod";

export const wind_chill_calculatorSchema = z.object({
  tempF: z.number().optional(),
  windMph: z.number().optional(),
});
