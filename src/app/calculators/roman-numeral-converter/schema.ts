import { z } from "zod";

export const roman_numeral_converterSchema = z.object({
  numberVal: z.number().optional(),
});
