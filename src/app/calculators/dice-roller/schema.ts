import { z } from "zod";

export const dice_rollerSchema = z.object({
  diceCount: z.number().optional(),
  diceSides: z.string().optional(),
  modifier: z.number().optional(),
});
