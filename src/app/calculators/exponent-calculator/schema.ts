import { z } from "zod";

export const exponent_calculatorSchema = z.object({
  base: z.number().optional(),
  exponent: z.number().optional(),
});
