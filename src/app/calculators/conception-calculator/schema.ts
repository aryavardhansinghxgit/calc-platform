import { z } from "zod";

export const conception_calculatorSchema = z.object({
  dueDate: z.string().optional(),
});
