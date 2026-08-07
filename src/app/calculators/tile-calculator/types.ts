export interface TileCalculatorInputs {
  roomSqFt?: number;
  tileSizeInches?: string;
  wastePct?: number;
}

export interface TileCalculatorOutputs {
  tilesNeeded: number;
  boxesNeeded: number;
}
