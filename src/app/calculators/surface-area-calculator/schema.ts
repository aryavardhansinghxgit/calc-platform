import { z } from "zod";

export const surface_area_calculatorSchema = z.object({
  shape: z.string().optional(),
  dim1: z.number().optional(),
  dim2: z.number().optional(),
});
