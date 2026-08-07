import { z } from "zod";

export const horsepower_calculatorSchema = z.object({
  torqueLbFt: z.number().optional(),
  rpm: z.number().optional(),
});
