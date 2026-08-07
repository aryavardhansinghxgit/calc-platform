import { z } from "zod";

export const gravel_calculatorSchema = z.object({
  areaSqFt: z.number().optional(),
  depthInches: z.number().optional(),
});
