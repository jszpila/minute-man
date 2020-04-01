/**
 * InputConfig
 * Attribute value configuration for various inputs
 */

export const OffsetConfig = {
  min: 1,
  max: 99.99,
}

export const ZeroAtDistanceConfig = {
  min: 25,
  max: 500,
  maxLength: 3,
  step: 25,
}

export const RestrictedNumericInputConfig = {
  maxLength: 5,
  maxValue: 99.99,
  placeholder: '00.00',
}

export const requireAtLeastOneOfFields = [
  'horizontalOffsetDistance', 
  'verticalOffsetDistance',
]
