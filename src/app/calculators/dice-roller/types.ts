export interface DiceRollerInputs {
  diceCount?: number;
  diceSides?: string;
  modifier?: number;
}

export interface DiceRollerOutputs {
  totalScore: number;
  rollsList: string;
}
