import { z } from "zod";

export const healthy_weight_calculatorSchema = z.object({
  heightCm: z.number().optional(),
});
