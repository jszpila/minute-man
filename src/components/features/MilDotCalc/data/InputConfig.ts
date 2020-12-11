/**
 * InputConfig
 * Attribute value configuration for various inputs
 */

export interface IInputConfig {
  min: number,
  max: number,
}

export const PhysicalSizeConfig = {
  min: 0.1,
  max: 999,
}

export const MilSizeConfig = {
  min: 0.1,
  max: 100,
}

export const DistanceConfig = {
  min: 0.1,
  max: 9999,
}

export const RestrictedNumericInputConfig = {
  maxLength: 5,
  placeholder: '00.00',
}
