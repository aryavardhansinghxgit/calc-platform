import { z } from "zod";

export const number_sequence_calculatorSchema = z.object({
  seqType: z.string().optional(),
  firstTerm: z.number().optional(),
  diffRatio: z.number().optional(),
  termCount: z.number().optional(),
});
