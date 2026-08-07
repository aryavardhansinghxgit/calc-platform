import { z } from "zod";

export const electricity_calculatorSchema = z.object({
  wattage: z.number().optional(),
  hoursPerDay: z.number().optional(),
  costPerKwh: z.number().optional(),
});
