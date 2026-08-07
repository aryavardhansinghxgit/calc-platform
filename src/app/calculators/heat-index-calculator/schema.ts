import { z } from "zod";

export const heat_index_calculatorSchema = z.object({
  tempF: z.number().optional(),
  humidityPct: z.number().optional(),
});
