import { z } from "zod";

export const right_triangle_calculatorSchema = z.object({
  sideA: z.number().optional(),
  sideB: z.number().optional(),
});
