import { z } from "zod";

export const gfr_calculatorSchema = z.object({
  serumCreatinine: z.number().optional(),
  age: z.number().optional(),
  gender: z.string().optional(),
});
