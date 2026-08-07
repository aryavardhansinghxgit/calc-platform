import { z } from "zod";

export const tile_calculatorSchema = z.object({
  roomSqFt: z.number().optional(),
  tileSizeInches: z.string().optional(),
  wastePct: z.number().optional(),
});
