import { z } from "zod";

export const random_number_generatorSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  count: z.number().optional(),
});
