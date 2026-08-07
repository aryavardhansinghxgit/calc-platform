import { z } from "zod";

export const big_number_calculatorSchema = z.object({
  num1: z.string().optional(),
  operation: z.string().optional(),
  num2: z.string().optional(),
});
