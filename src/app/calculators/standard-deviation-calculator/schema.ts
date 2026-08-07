import { z } from "zod";

export const standard_deviation_calculatorSchema = z.object({
  dataSeries: z.string().optional(),
});
