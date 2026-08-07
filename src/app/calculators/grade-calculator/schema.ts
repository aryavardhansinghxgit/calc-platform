import { z } from "zod";

export const grade_calculatorSchema = z.object({
  currentGrade: z.number().optional(),
  targetGrade: z.number().optional(),
  finalWeight: z.number().optional(),
});
