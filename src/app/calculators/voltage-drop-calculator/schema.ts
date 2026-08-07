import { z } from "zod";

export const voltage_drop_calculatorSchema = z.object({
  voltage: z.number().optional(),
  currentAmps: z.number().optional(),
  distanceFt: z.number().optional(),
  wireGauge: z.string().optional(),
});
