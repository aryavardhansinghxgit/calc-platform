import { z } from "zod";

export const conversion_calculatorSchema = z.object({
  value: z.number().optional(),
  unitCategory: z.string().optional(),
});
