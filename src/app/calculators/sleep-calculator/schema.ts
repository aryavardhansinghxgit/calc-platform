import { z } from "zod";

export const sleep_calculatorSchema = z.object({
  wakeTime: z.string().optional(),
});
