import { z } from "zod";

export const hex_calculatorSchema = z.object({
  hex1: z.string().optional(),
  operation: z.string().optional(),
  hex2: z.string().optional(),
});
