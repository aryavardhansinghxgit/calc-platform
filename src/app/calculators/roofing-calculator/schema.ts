import { z } from "zod";

export const roofing_calculatorSchema = z.object({
  houseLengthFt: z.number().optional(),
  houseWidthFt: z.number().optional(),
  pitch: z.string().optional(),
});
