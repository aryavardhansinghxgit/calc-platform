import { TileCalculatorOutputs } from "./types";

export function calculateTileCalculator(inputs: Record<string, any>): TileCalculatorOutputs {
  const area = Math.max(1, Number(inputs.roomSqFt) || 200);
  const tileSqIn = Number(inputs.tileSizeInches) || 144;
  const waste = Math.max(0, Number(inputs.wastePct) || 10) / 100;
  const totalArea = area * (1 + waste);
  const tileSqFt = tileSqIn / 144;
  const tiles = Math.ceil(totalArea / tileSqFt);
  const boxes = Math.ceil(tiles / 10);
  return { tilesNeeded: tiles, boxesNeeded: boxes };
}
