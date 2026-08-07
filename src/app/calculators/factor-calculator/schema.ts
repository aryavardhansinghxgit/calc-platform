import { z } from "zod";

export const factor_calculatorSchema = z.object({
  number: z.number().optional(),
});
