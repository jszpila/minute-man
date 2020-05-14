/**
 * Defaults
 * Default data for form fields
 */

import { Direction } from "../../../../enum/Direction"

const ClickulatorDefaultValues = {
  horizontalOffsetDistance: undefined,
  horizontalOffsetDirection: Direction.Left,
  verticalOffsetDistance: undefined,
  verticalOffsetDirection: Direction.Up,
  zeroAtDistance: 100,
  adjustmentIncrement: 0.25,
  shouldShowResultsModal: false,
  isValid: false,
  errors: [],
  corrections: {
    horizontal: undefined,
    vertical: undefined,
  },
}

export default ClickulatorDefaultValues;
