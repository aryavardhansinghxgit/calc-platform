import { z } from "zod";

export const bandwidth_calculatorSchema = z.object({
  fileSizeMb: z.number().optional(),
  speedMbps: z.number().optional(),
});
