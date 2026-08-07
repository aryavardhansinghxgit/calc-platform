import { z } from "zod";

export const percent_error_calculatorSchema = z.object({
  expVal: z.number().optional(),
  theoVal: z.number().optional(),
});
