import { z } from "zod";

export const density_calculatorSchema = z.object({
  massKg: z.number().optional(),
  volumeM3: z.number().optional(),
});
