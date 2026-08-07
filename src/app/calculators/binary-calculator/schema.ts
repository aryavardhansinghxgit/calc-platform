import { z } from "zod";

export const binary_calculatorSchema = z.object({
  binary1: z.string().optional(),
  operation: z.string().optional(),
  binary2: z.string().optional(),
});
