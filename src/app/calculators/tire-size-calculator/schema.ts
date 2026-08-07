import { z } from "zod";

export const tire_size_calculatorSchema = z.object({
  widthMm: z.number().optional(),
  aspectRatio: z.number().optional(),
  rimDiameterInches: z.number().optional(),
});
