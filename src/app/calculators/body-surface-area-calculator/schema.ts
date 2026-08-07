import { z } from "zod";

export const body_surface_area_calculatorSchema = z.object({
  weightKg: z.number().optional(),
  heightCm: z.number().optional(),
});
