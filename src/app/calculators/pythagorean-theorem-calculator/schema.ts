import { z } from "zod";

export const pythagorean_theorem_calculatorSchema = z.object({
  sideA: z.number().optional(),
  sideB: z.number().optional(),
});
