import Units from "../../../enum/Units";
import UnitConverter from "../../../util/UnitConversions";
import SettingsStore from "../Settings/SettingsStore";
/**
 * Calculator
 * Calculates correction data
 */

import ClickulatorDefaultValues from "./data/Defaults";
import InvertedDirection from "./data/InvertedDirection";

const defaults = ClickulatorDefaultValues; // importing "as" throws error

interface ICalculatorData {
  horizontalOffsetDistance: number | undefined;
  horizontalOffsetDirection: string;
  verticalOffsetDistance: number | undefined;
  verticalOffsetDirection: string;
  adjustmentIncrement: number;
  zeroAtDistance: number;
}

interface ICorrectionData {
  distance: number;
  direction: string;
}

export interface ICorrectionResult {
  clicks: number;
  direction: string;
}

export interface ICalculatorResult {
  horizontal: ICorrectionResult | undefined;
  vertical: ICorrectionResult | undefined;
}

export default class Calculator {
  private static instance: Calculator;

  private adjustmentIncrement: number = defaults.adjustmentIncrement;
  private zeroAtDistance: number = defaults.zeroAtDistance;
  private horizontalCorrection: ICorrectionResult | undefined;
  private verticalCorrection: ICorrectionResult | undefined;

  static getInstance(): Calculator {
    if (!Calculator.instance) {
      Calculator.instance = new Calculator();
    }

    return Calculator.instance;
  }

  public get corrections(): ICalculatorResult {
    return {
      horizontal: this.horizontalCorrection,
      vertical: this.verticalCorrection,
    };
  }

  // NOTE: adapted from https://www.nssf.org/shooting/minute-angle-moa
  private calculateCorrection(
    data: ICorrectionData
  ): ICorrectionResult | undefined {
    const converter = UnitConverter.getInstance();
    const isImperial = SettingsStore.getInstance().app.units === Units.Imperial;
    const direction = InvertedDirection.get(data.direction) || "";
    const adjustmentNumerator: number = isImperial
      ? data.distance
      : converter.cmToInches(data.distance);
    const moaNumerator: number = isImperial
      ? this.zeroAtDistance
      : converter.yardsToMeters(this.zeroAtDistance);
    const moaDenominator: number = isImperial
      ? 100
      : converter.yardsToMeters(100);
    const moaAtDistance = moaNumerator / moaDenominator; // NOTE: 1moa = 1 inch @ 100 yards
    const moaAdjustment = adjustmentNumerator / moaAtDistance;
    const numClicks = Math.floor(moaAdjustment / this.adjustmentIncrement); // NOTE: No "half-clicks", force a whole number

    let correction = undefined;

    if (numClicks > 0) {
      correction = {
        clicks: numClicks,
        direction: direction,
      };
    }

    return correction;
  }

  public calculateCorrections(data: ICalculatorData): void {
    this.zeroAtDistance = data.zeroAtDistance;
    this.adjustmentIncrement = data.adjustmentIncrement;

    if (data.horizontalOffsetDistance !== undefined) {
      this.horizontalCorrection = this.calculateCorrection({
        distance: data.horizontalOffsetDistance,
        direction: data.horizontalOffsetDirection,
      });
    }

    if (data.verticalOffsetDistance !== undefined) {
      this.verticalCorrection = this.calculateCorrection({
        distance: data.verticalOffsetDistance,
        direction: data.verticalOffsetDirection,
      });
    }
  }
}
