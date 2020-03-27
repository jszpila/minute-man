import { Direction } from "../../../../enum/Direction";

const InvertedDirection = new Map<string, string>([
  [Direction.Up, Direction.Down],
  [Direction.Down, Direction.Up],
  [Direction.Left, Direction.Right],
  [Direction.Right, Direction.Left],
]);

export default InvertedDirection;
