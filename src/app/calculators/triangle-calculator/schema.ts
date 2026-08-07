import { z } from "zod";

export const triangle_calculatorSchema = z.object({
  sideA: z.number().optional(),
  sideB: z.number().optional(),
  sideC: z.number().optional(),
});
