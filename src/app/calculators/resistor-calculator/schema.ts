import { z } from "zod";

export const resistor_calculatorSchema = z.object({
  band1: z.string().optional(),
  band2: z.string().optional(),
  multiplier: z.string().optional(),
});
