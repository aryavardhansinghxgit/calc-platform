import { z } from "zod";

export const molecular_weight_calculatorSchema = z.object({
  presetCompound: z.string().optional(),
});
