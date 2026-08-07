import { z } from "zod";

export const square_footage_calculatorSchema = z.object({
  lengthFt: z.number().optional(),
  widthFt: z.number().optional(),
  pricePerSqFt: z.number().optional(),
});
