import { z } from "zod";

export const stair_calculatorSchema = z.object({
  totalRiseInches: z.number().optional(),
  targetRiserHeight: z.number().optional(),
});
