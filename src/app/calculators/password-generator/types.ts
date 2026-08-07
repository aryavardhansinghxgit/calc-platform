export interface PasswordGeneratorInputs {
  length?: number;
}

export interface PasswordGeneratorOutputs {
  generatedPassword: string;
  entropyBits: number;
}
