import { z } from "zod";

export const body_type_calculatorSchema = z.object({
  gender: z.string().optional(),
  bustChest: z.number().optional(),
  waist: z.number().optional(),
  hip: z.number().optional(),
});
