import { z } from "zod";

export const scientific_calculatorSchema = z.object({
  value1: z.number().optional(),
  operation: z.string().optional(),
});
