/**
 * Defaults
 * Default data for form fields
 */

import { Direction } from "../../../../enum/Direction"

export const ClickulatorDefaultValues = {
  horizontalOffsetDistance: undefined,
  horizontalOffsetDirection: Direction.Left,
  verticalOffsetDistance: undefined,
  verticalOffsetDirection: Direction.Up,
  zeroAtDistance: 100,
  opticAdjustmentIncrement: 0.25,
  shouldShowResultsModal: false,
  isValid: false,
  errors: [],
  corrections: [],
}
