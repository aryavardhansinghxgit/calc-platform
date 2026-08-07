import { z } from "zod";

export const bmi_calculatorSchema = z.object({
  weightKg: z.number().optional(),
  heightCm: z.number().optional(),
});
