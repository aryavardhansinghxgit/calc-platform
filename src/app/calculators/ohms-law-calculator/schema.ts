import { z } from "zod";

export const ohms_law_calculatorSchema = z.object({
  voltage: z.number().optional(),
  resistance: z.number().optional(),
});
