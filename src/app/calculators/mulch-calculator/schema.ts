import { z } from "zod";

export const mulch_calculatorSchema = z.object({
  areaSqFt: z.number().optional(),
  depthInches: z.number().optional(),
});
