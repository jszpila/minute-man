/**
 * Calculator
 * Calculates correction data
 */

import ClickulatorDefaultValues from "./data/Defaults";
import InvertedDirection from "./data/InvertedDirection";

const defaults = ClickulatorDefaultValues; // importing "as" throws error
interface ICalculatorData {
  horizontalOffsetDistance: number | undefined,
  horizontalOffsetDirection: string,
  verticalOffsetDistance: number | undefined,
  verticalOffsetDirection: string,
  adjustmentIncrement: number,
  zeroAtDistance: number,
}

interface ICorrectionData {
  distance: number,
  direction: string,
}

export interface ICorrectionResult {
  clicks: number,
  direction: string,
}

export interface ICalculatorResult {
  horizontal: ICorrectionResult | undefined,
  vertical: ICorrectionResult | undefined,
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
    }
  }

  // NOTE: adapted from https://www.nssf.org/shooting/minute-angle-moa
  private calculateCorrection(data: ICorrectionData): ICorrectionResult | undefined {
    const direction = InvertedDirection.get(data.direction) || '';
    const moaAtDistance = this.zeroAtDistance / 100; // NOTE: 1moa = 1 inch @ 100 yards
    const moaAdjustment = data.distance / moaAtDistance;
    const numClicks = Math.floor(moaAdjustment / this.adjustmentIncrement); // NOTE: No "half-clicks", force a whole number

    console.log(numClicks);
    let correction = undefined;

    if (numClicks > 0) {
      correction = {
        clicks: numClicks,
        direction: direction,
      }
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
