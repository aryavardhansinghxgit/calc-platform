export interface PasswordGeneratorInputs {
  activeTab?: string;

  // Random Password Inputs
  length?: number;
  includeLowercase?: boolean;
  includeUppercase?: boolean;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
  customSymbols?: string;
  excludeAmbiguous?: boolean;
  excludeBrackets?: boolean;
  customExclusions?: string;
  noRepeat?: boolean;
  requireAllCategories?: boolean;

  // Passphrase Inputs
  wordCount?: number;
  separator?: string;
  capitalize?: boolean;
  passphraseIncludeNumber?: boolean;
  passphraseIncludeSymbol?: boolean;

  // PIN Inputs
  pinLength?: number;

  // Strength Checker Inputs
  checkPassword?: string;
}

export interface PasswordGeneratorOutputs {
  generatedPassword?: string;
  generatedPasswords?: string[]; // for bulk generation
  entropyBits: number;
  combinationsCountString: string;
  poolSize: number;
  strengthCategory: "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong";
  
  // Character Counts (analysis)
  lowercaseCount?: number;
  uppercaseCount?: number;
  numbersCount?: number;
  symbolsCount?: number;
  uniqueCount?: number;
  repeatedCount?: number;

  // Strength warnings
  warnings?: string[];
  calculationSteps?: string;
  error?: string;
}
