import { z } from "zod";

export const bra_size_calculatorSchema = z.object({
  underbustInches: z.number().optional(),
  bustInches: z.number().optional(),
});
