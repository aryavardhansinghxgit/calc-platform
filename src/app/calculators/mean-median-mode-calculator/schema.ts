import { z } from "zod";

export const mean_median_mode_calculatorSchema = z.object({
  dataSeries: z.string().optional(),
});
