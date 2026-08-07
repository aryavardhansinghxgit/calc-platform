import { z } from "zod";

export const gpa_calculatorSchema = z.object({
  g1: z.number().optional(),
  c1: z.number().optional(),
  g2: z.number().optional(),
  c2: z.number().optional(),
});
