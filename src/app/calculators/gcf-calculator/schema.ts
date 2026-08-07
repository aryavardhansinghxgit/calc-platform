import { z } from "zod";

export const gcf_calculatorSchema = z.object({
  num1: z.number().optional(),
  num2: z.number().optional(),
  num3: z.number().optional(),
});
