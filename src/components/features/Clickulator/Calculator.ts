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

// TODO: singleton
export default class Calculator {
  private horizontalOffsetDistance: number | undefined;
  private horizontalOffsetDirection: string;
  private verticalOffsetDistance: number | undefined;
  private verticalOffsetDirection: string;
  private opticAdjustmentIncrement: number;
  private zeroAtDistance: number;
  private correctionsList: Array<string> = [];

  public get corrections(): Array<string> {
    return this.correctionsList;
  }

  public constructor(data: ICalculatorData) {
    this.horizontalOffsetDistance = data.horizontalOffsetDistance;
    this.horizontalOffsetDirection = data.horizontalOffsetDirection;
    this.verticalOffsetDistance = data.verticalOffsetDistance;
    this.verticalOffsetDirection = data.verticalOffsetDirection;
    this.opticAdjustmentIncrement = data.opticAdjustmentIncrement;
    this.zeroAtDistance = data.zeroAtDistance;
  }

  // NOTE: adapted from https://www.nssf.org/shooting/minute-angle-moa
  private calculateCorrection(offsetDistance: number, direction: string): string {
    const adjustmentDirection = InvertedDirection.get(direction);
    const moaAtDistance = this.zeroAtDistance / 100;
    const moaAdjustment = offsetDistance / moaAtDistance;
    const numClicks = Math.floor(moaAdjustment / this.opticAdjustmentIncrement);

    return `${numClicks} clicks ${adjustmentDirection}`;
  }

  public generateCorrectionsList(): void {
    if (this.horizontalOffsetDistance !== undefined) {
      this.corrections.push(this.calculateCorrection(this.horizontalOffsetDistance, this.horizontalOffsetDirection));
    }

    if (this.verticalOffsetDistance !== undefined) {
      this.corrections.push(this.calculateCorrection(this.verticalOffsetDistance, this.verticalOffsetDirection));
    }
  }
}
