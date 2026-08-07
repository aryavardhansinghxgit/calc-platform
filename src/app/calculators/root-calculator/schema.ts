import { z } from "zod";

export const root_calculatorSchema = z.object({
  value: z.number().optional(),
  degree: z.number().optional(),
});
