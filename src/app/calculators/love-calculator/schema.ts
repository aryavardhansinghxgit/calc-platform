import { z } from "zod";

export const love_calculatorSchema = z.object({
  name1: z.string().optional(),
  name2: z.string().optional(),
});
