import { z } from "zod";

export const percentage_calculatorSchema = z.object({
  calcType: z.string().optional(),
  valueX: z.number().optional(),
  valueY: z.number().optional(),
});
