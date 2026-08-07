import { z } from "zod";

export const weight_calculatorSchema = z.object({
  massKg: z.number().optional(),
  celestialBody: z.string().optional(),
});
