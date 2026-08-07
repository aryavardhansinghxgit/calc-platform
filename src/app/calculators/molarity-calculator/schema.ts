import { z } from "zod";

export const molarity_calculatorSchema = z.object({
  massGrams: z.number().optional(),
  molarMass: z.number().optional(),
  volumeLiters: z.number().optional(),
});
