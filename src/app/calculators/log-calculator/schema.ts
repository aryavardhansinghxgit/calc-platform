import { z } from "zod";

export const log_calculatorSchema = z.object({
  value: z.number().optional(),
  base: z.number().optional(),
});
