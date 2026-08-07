import { z } from "zod";

export const url_encoder_decoderSchema = z.object({
  text: z.string().optional(),
  mode: z.string().optional(),
});
