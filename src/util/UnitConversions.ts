// Common unit conversions used in calculations

export const METERS_IN_YARD = 1.093613;
export const FEET_IN_METER = 3.28084
export const CM_IN_INCH = 0.3937008;

export default class UnitConverter {
  private static instance: UnitConverter;

  static getInstance(): UnitConverter {
    if (!UnitConverter.instance) {
      UnitConverter.instance = new UnitConverter();
    }

    return UnitConverter.instance;
  }

  public cmToInches(value: number): number {
    return value * CM_IN_INCH;
  }

  public yardsToMeters(value: number): number {
    return value * METERS_IN_YARD;
  }
}
