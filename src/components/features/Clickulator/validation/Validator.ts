/**
 * Validator
 * Handles clickulator validation logic
 */

import { OffsetConfig, ZeroAtDistanceConfig } from '../data/InputConfig';
import ValidationMessages from './ValidationMessages';

interface IValidatorData {
  horizontalOffsetDistance: number | undefined,
  verticalOffsetDistance: number | undefined,
  zeroAtDistance: number,
}

// TODO: singleton
export default class Validator {
  private horizontalOffsetDistance: number | undefined;
  private verticalOffsetDistance: number | undefined;
  private zeroAtDistance: number;

  public errors: Array<string> = [];

  public get isValid(): boolean {
    return this.errors.length === 0;
  }

  public constructor(data: IValidatorData) {
    this.horizontalOffsetDistance = data.horizontalOffsetDistance;
    this.verticalOffsetDistance = data.verticalOffsetDistance;
    this.zeroAtDistance = data.zeroAtDistance;
  }

  public validate(): void {
    this.validatePresenceOfOffsets();
    this.validateOffsetValue(this.horizontalOffsetDistance, 'Horizontal');
    this.validateOffsetValue(this.verticalOffsetDistance, 'Vertical');
    this.validateZeroAtDistance();
  }

  private validatePresenceOfOffsets(): void {
    if (this.horizontalOffsetDistance === undefined
        && this.verticalOffsetDistance === undefined) {
          this.errors.push(ValidationMessages.atLeastOneOf.required);
    }
  }

  private validateOffsetValue(value: number | undefined, fieldLabel: string): void {   
    if (value !== undefined) {
      // TODO: find a better way to inject values into validation message
      if (value < OffsetConfig.min) {
        this.errors.push(fieldLabel + ValidationMessages.offsetDistance.min);
      }

      if (value > OffsetConfig.max) {
        this.errors.push(fieldLabel + ValidationMessages.offsetDistance.max)
      }
    }
  }

  private validateZeroAtDistance(): void {
    if (this.zeroAtDistance < ZeroAtDistanceConfig.min) {
      this.errors.push(ValidationMessages.zeroAtDistance.min)
    }

    if (this.zeroAtDistance > ZeroAtDistanceConfig.max) {
      this.errors.push(ValidationMessages.zeroAtDistance.max)
    }
  }
}
