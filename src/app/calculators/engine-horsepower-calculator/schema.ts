import { z } from "zod";

export const engine_horsepower_calculatorSchema = z.object({
  weightLbs: z.number().optional(),
  trapSpeedMph: z.number().optional(),
});
