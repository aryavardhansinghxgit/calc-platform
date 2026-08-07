import { z } from "zod";

export const time_zone_calculatorSchema = z.object({
  timeStr: z.string().optional(),
  fromOffset: z.number().optional(),
  toOffset: z.number().optional(),
});
