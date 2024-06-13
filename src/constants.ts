import { Direction } from "./types";

export const ROWS = 5;
export const COLS = 5;
export const DIRECTIONS: Direction[] = [
  Direction.North,
  Direction.East,
  Direction.South,
  Direction.West,
];
export const DIRECTION_MAP: { [key in Direction]: string } = {
  [Direction.North]: "North",
  [Direction.East]: "East",
  [Direction.South]: "South",
  [Direction.West]: "West",
};
