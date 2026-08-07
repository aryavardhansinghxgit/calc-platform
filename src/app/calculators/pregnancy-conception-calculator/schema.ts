import { z } from "zod";

export const pregnancy_conception_calculatorSchema = z.object({
  dueDate: z.string().optional(),
});
