import { z } from "zod";

export const dew_point_calculatorSchema = z.object({
  tempC: z.number().optional(),
  humidityPct: z.number().optional(),
});
