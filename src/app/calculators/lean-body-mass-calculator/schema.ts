import { z } from "zod";

export const lean_body_mass_calculatorSchema = z.object({
  gender: z.string().optional(),
  weightKg: z.number().optional(),
  heightCm: z.number().optional(),
});
