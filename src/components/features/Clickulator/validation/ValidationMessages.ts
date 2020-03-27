/**
 * Validation messages
 * Text for validation messages
 */
import { OffsetConfig, ZeroAtDistanceConfig } from "../data/InputConfig";

const ValidationMessages = {
  offsetDistance: {
    min: ` Offset must be at least ${OffsetConfig.min}`,
    max: ` Offset must not be greater than ${OffsetConfig.max}`,
  },
  zeroAtDistance: {
    min: `Zero Distance must be at least ${ZeroAtDistanceConfig.min}`,
    max: `Zero Distance must not be greater than ${ZeroAtDistanceConfig.max}`,
    required: `Zero Distance is required`,
  },
  atLeastOneOf: {
    required: 'At least one offset is required',
  }
}

export default ValidationMessages;
