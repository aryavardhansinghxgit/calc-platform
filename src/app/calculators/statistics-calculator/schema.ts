import { z } from "zod";

export const statistics_calculatorSchema = z.object({
  dataSeries: z.string().optional(),
});
