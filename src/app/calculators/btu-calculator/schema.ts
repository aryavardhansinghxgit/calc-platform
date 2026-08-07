import { z } from "zod";

export const btu_calculatorSchema = z.object({
  lengthFt: z.number().optional(),
  widthFt: z.number().optional(),
  insulation: z.string().optional(),
});
