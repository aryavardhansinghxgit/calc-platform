import { z } from "zod";

export const scientific_notation_calculatorSchema = z.object({
  number: z.number().optional(),
});
