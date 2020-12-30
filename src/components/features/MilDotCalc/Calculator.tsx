/**
 * Calculator
 * Calculates mildot data
 * Math taken or derived from material at https://skillatarms.com/mil-dot-formula-calculator-ranging-and-measuring-made-easy/
 */

import Units from "../../../enum/Units";
import {
  getLocalizedDistanceUnit,
  getLocalizedOffsetUnit,
  getLocalizedStringByKey,
} from "../../../util/L10n";
import SettingsStore from "../Settings/SettingsStore";

interface ICalculatorData {
  milSize: number | undefined;
  physicalSize: number | undefined;
  distance: number | undefined;
}

export interface ICalculatorResult {
  key: string;
  value: string;
  unit: string;
}

export default class Calculator {
  private static instance: Calculator;
  private isImperial = SettingsStore.getInstance().app.units === Units.Imperial;
  private milModifier = this.isImperial ? 27.77 : 10;
  private distanceUnit = getLocalizedDistanceUnit();
  private sizeUnit = getLocalizedOffsetUnit();
  private resultData: ICalculatorResult | undefined;

  static getInstance(): Calculator {
    if (!Calculator.instance) {
      Calculator.instance = new Calculator();
    }

    return Calculator.instance;
  }

  private calculateDistance(physicalSize: number, milSize: number): void {
    this.resultData = {
      key: "mildotcalc.results.distance",
      value: ((physicalSize / milSize) * this.milModifier).toFixed(2),
      unit: this.distanceUnit,
    };
  }

  private calculateMilSize(physicalSize: number, distance: number): void {
    this.resultData = {
      key: "mildotcalc.results.size",
      value: (distance / physicalSize / this.milModifier).toFixed(2),
      unit: getLocalizedStringByKey("units.mil"),
    };
  }

  private calculatePhysicalSize(milSize: number, distance: number): void {
    this.resultData = {
      key: "mildotcalc.results.size",
      value: ((distance * milSize) / this.milModifier).toFixed(2),
      unit: this.sizeUnit,
    };
  }

  public get result(): ICalculatorResult | undefined {
    return this.resultData;
  }

  public calculate(data: ICalculatorData): void {
    const { distance, milSize, physicalSize } = data;

    if (milSize !== undefined && physicalSize !== undefined) {
      this.calculateDistance(physicalSize, milSize);
    } else if (physicalSize !== undefined && distance !== undefined) {
      this.calculateMilSize(physicalSize, distance);
    } else if (milSize !== undefined && distance !== undefined) {
      this.calculatePhysicalSize(milSize, distance);
    } else {
      console.error("MilDotCalc Error: no possible calculation");
    }
  }
}
