import { z } from "zod";

export const mass_calculatorSchema = z.object({
  densityKgM3: z.number().optional(),
  volumeM3: z.number().optional(),
});
