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

export default class Validator {
  private static instance: Validator;

  public errors: Array<string> = [];

  public get isValid(): boolean {
    return this.errors.length === 0;
  }

  static getInstance(): Validator {
    if (!Validator.instance) {
      Validator.instance = new Validator();
    }

    return Validator.instance;
  }

  private constructor() {}

  public validate(data: IValidatorData): void {
    this.errors = [];
    this.validateOffsetValue(data.horizontalOffsetDistance, 'Horizontal');
    this.validateOffsetValue(data.verticalOffsetDistance, 'Vertical');
    this.validatePresenceOfOffsets(data);
    this.validateZeroAtDistance(data.zeroAtDistance);
  }

  private validatePresenceOfOffsets(data: IValidatorData): void {
    if (data.horizontalOffsetDistance === undefined
        && data.verticalOffsetDistance === undefined) {
          this.errors.push(ValidationMessages.atLeastOneOf.required);
    }
  }

  private validateOffsetValue(value: number | undefined, fieldLabel: string): void {   
    if (value !== undefined) {
      if (value < OffsetConfig.min) {
        this.errors.push(`${fieldLabel} ${ValidationMessages.offsetDistance.min}`);
      }

      if (value > OffsetConfig.max) {
        this.errors.push(`${fieldLabel} ${ValidationMessages.offsetDistance.max}`)
      }
    }
  }

  private validateZeroAtDistance(value: number): void {
    if (value < ZeroAtDistanceConfig.min) {
      this.errors.push(ValidationMessages.zeroAtDistance.min)
    }

    if (value > ZeroAtDistanceConfig.max) {
      this.errors.push(ValidationMessages.zeroAtDistance.max)
    }
  }
}
