import { z } from "zod";

export const confidence_interval_calculatorSchema = z.object({
  mean: z.number().optional(),
  sd: z.number().optional(),
  sampleSize: z.number().optional(),
  confidenceLevel: z.string().optional(),
});
