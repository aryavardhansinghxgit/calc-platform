import { z } from "zod";

export const time_calculatorSchema = z.object({
  h1: z.number().optional(),
  m1: z.number().optional(),
  operation: z.string().optional(),
  h2: z.number().optional(),
  m2: z.number().optional(),
});
