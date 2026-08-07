import { z } from "zod";

export const ip_subnet_calculatorSchema = z.object({
  ipAddress: z.string().optional(),
  cidr: z.number().optional(),
});
