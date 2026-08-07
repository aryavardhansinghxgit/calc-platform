import { z } from "zod";

export const probability_calculatorSchema = z.object({
  probA: z.number().optional(),
  probB: z.number().optional(),
});
