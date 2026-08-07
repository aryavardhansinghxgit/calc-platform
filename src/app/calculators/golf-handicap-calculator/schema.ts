import { z } from "zod";

export const golf_handicap_calculatorSchema = z.object({
  adjustedScore: z.number().optional(),
  courseRating: z.number().optional(),
  slopeRating: z.number().optional(),
});
