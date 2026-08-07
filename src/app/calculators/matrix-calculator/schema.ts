import { z } from "zod";

export const matrix_calculatorSchema = z.object({
  a11: z.number().optional(),
  a12: z.number().optional(),
  a21: z.number().optional(),
  a22: z.number().optional(),
  operation: z.string().optional(),
});
