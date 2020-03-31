/**
 * Calculator
 * Calculates correction data
 */

import InvertedDirection from "./data/InvertedDirection";

interface ICalculatorData {
  horizontalOffsetDistance: number | undefined,
  horizontalOffsetDirection: string,
  verticalOffsetDistance: number | undefined,
  verticalOffsetDirection: string,
  opticAdjustmentIncrement: number,
  zeroAtDistance: number,
}

interface ICorrectionData {
  distance: number,
  direction: string,
}

export default class Calculator {
  private static instance: Calculator;

  private opticAdjustmentIncrement: number = 0;
  private zeroAtDistance: number = 0;
  private correctionsList: Array<string> = [];

  private constructor() {}

  static getInstance(): Calculator {
    if (!Calculator.instance) {
      Calculator.instance = new Calculator();
    }

    return Calculator.instance;
  }

  public get corrections(): Array<string> {
    return this.correctionsList;
  }

  // NOTE: adapted from https://www.nssf.org/shooting/minute-angle-moa
  private calculateCorrection(data: ICorrectionData): string {
    const adjustmentDirection = InvertedDirection.get(data.direction);
    const moaAtDistance = this.zeroAtDistance / 100;
    const moaAdjustment = data.distance / moaAtDistance;
    const numClicks = Math.floor(moaAdjustment / this.opticAdjustmentIncrement); // NOTE: No "half-clicks", force a whole number

    let correction = '';

    if (numClicks > 0) {
      correction = `${numClicks} clicks ${adjustmentDirection}`;
    } else {
      correction = `${data.distance}" is within 1moa @ ${this.zeroAtDistance} yards`;
    }

    return correction;
  }

  public generateCorrectionsList(data: ICalculatorData): void {
    this.zeroAtDistance = data.zeroAtDistance;
    this.opticAdjustmentIncrement = data.opticAdjustmentIncrement;
    this.correctionsList = [];

    if (data.horizontalOffsetDistance !== undefined) {
      this.corrections.push(this.calculateCorrection({
        distance: data.horizontalOffsetDistance,
        direction: data.horizontalOffsetDirection,
      }));
    }

    if (data.verticalOffsetDistance !== undefined) {
      this.corrections.push(this.calculateCorrection({
        distance: data.verticalOffsetDistance,
        direction: data.verticalOffsetDirection,
      }));
    }
  }
}
