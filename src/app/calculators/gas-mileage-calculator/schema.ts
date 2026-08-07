import { z } from "zod";

export const gas_mileage_calculatorSchema = z.object({
  startOdometer: z.number().optional(),
  endOdometer: z.number().optional(),
  gallonsFilled: z.number().optional(),
});
