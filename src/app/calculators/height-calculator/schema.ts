import { z } from "zod";

export const height_calculatorSchema = z.object({
  fatherHeightCm: z.number().optional(),
  motherHeightCm: z.number().optional(),
  childGender: z.string().optional(),
});
