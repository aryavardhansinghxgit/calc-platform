import { z } from "zod";

export const password_generatorSchema = z.object({
  length: z.number().optional(),
});
