import { z } from "zod";

export const circle_calculatorSchema = z.object({
  radius: z.number().optional(),
});
