import { z } from "zod";

export const fraction_calculatorSchema = z.object({
  num1: z.number().optional(),
  den1: z.number().optional(),
  operation: z.string().optional(),
  num2: z.number().optional(),
  den2: z.number().optional(),
});
