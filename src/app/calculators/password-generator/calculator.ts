import { PasswordGeneratorOutputs } from "./types";

export function calculatePasswordGenerator(inputs: Record<string, any>): PasswordGeneratorOutputs {
  const len = Math.min(64, Math.max(6, Number(inputs.length) || 16));
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const entropy = Math.round(len * Math.log2(chars.length));
  return { generatedPassword: pwd, entropyBits: entropy };
}
