import { z } from "zod";

export const gdp_calculatorSchema = z.object({
  consumption: z.number().optional(),
  investment: z.number().optional(),
  government: z.number().optional(),
  exports: z.number().optional(),
  imports: z.number().optional(),
});
