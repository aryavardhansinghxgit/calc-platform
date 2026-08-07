import { z } from "zod";

export const sample_size_calculatorSchema = z.object({
  confidenceLevel: z.string().optional(),
  marginError: z.number().optional(),
  population: z.number().optional(),
});
