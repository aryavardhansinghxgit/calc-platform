import { z } from "zod";

export const rounding_calculatorSchema = z.object({
  number: z.number().optional(),
  precision: z.string().optional(),
});
