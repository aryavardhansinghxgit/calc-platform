import { z } from "zod";

export const fuel_cost_calculatorSchema = z.object({
  distanceMiles: z.number().optional(),
  mpg: z.number().optional(),
  gasPrice: z.number().optional(),
});
