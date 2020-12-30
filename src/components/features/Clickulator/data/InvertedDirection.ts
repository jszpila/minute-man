import { Direction } from "../../../../enum/Direction";
import { getLocalizedStringByKey } from "../../../../util/L10n";

const InvertedDirection = new Map<string, string>([
  [Direction.Up, getLocalizedStringByKey("clickulator.directions.down")],
  [Direction.Down, getLocalizedStringByKey("clickulator.directions.up")],
  [Direction.Left, getLocalizedStringByKey("clickulator.directions.right")],
  [Direction.Right, getLocalizedStringByKey("clickulator.directions.left")],
]);

export default InvertedDirection;
