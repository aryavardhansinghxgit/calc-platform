import { z } from "zod";

export const half_life_calculatorSchema = z.object({
  initialAmount: z.number().optional(),
  halfLife: z.number().optional(),
  elapsedTime: z.number().optional(),
});
