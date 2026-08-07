import { z } from "zod";

export const concrete_calculatorSchema = z.object({
  lengthFt: z.number().optional(),
  widthFt: z.number().optional(),
  depthInches: z.number().optional(),
});
