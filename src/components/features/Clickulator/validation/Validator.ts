/**
 * Validator
 * Handles clickulator validation logic
 */

import { OffsetConfig, ZeroAtDistanceConfig } from '../data/InputConfig';
import { getLocalizedStringByKey } from '../../../../util/L10n';

enum LocaleKeys {
  AtLeastOneOffset = 'clickulator.errors.offset.atLeastOne',
  MinOffset = 'clickulator.errors.offset.min',
  MaxOffset = 'clickulator.errors.offset.max',
  MinZeroDistance = 'clickulator.errors.zeroDistance.min',
  MaxZeroDistance = 'clickulator.errors.zeroDistance.max',
  HorizontalAxis = 'clickulator.axis.horizontal',
  VerticalAxis = 'clickulator.axis.vertical',
}

interface IValidatorData {
  horizontalOffsetDistance: number | undefined,
  verticalOffsetDistance: number | undefined,
  zeroAtDistance: number,
}

export interface IValidationError {
  localeStringKey: string,
  values?: any | undefined,
}

export default class Validator {
  private static instance: Validator;

  public errors: Array<IValidationError> = [];

  public get isValid(): boolean {
    return this.errors.length === 0;
  }

  static getInstance(): Validator {
    if (!Validator.instance) {
      Validator.instance = new Validator();
    }

    return Validator.instance;
  }

  public validate(data: IValidatorData): void {
    this.errors = [];
    this.validateOffsetValue(data.horizontalOffsetDistance, getLocalizedStringByKey(LocaleKeys.HorizontalAxis));
    this.validateOffsetValue(data.verticalOffsetDistance, getLocalizedStringByKey(LocaleKeys.VerticalAxis));
    this.validatePresenceOfOffsets(data);
    this.validateZeroAtDistance(data.zeroAtDistance);
  }

  private validatePresenceOfOffsets(data: IValidatorData): void {
    if (data.horizontalOffsetDistance === undefined
        && data.verticalOffsetDistance === undefined) {
          this.errors.push({ localeStringKey: LocaleKeys.AtLeastOneOffset });
    }
  }

  private validateOffsetValue(value: number | undefined, fieldLabel: string): void {   
    if (value !== undefined) {
      if (value < OffsetConfig.min) {
        this.errors.push({ 
          localeStringKey: LocaleKeys.MinOffset,
          values: {
            axis: fieldLabel,
            min: OffsetConfig.min,
          }
        });
      }

      if (value > OffsetConfig.max) {
        this.errors.push({ 
          localeStringKey: LocaleKeys.MaxOffset,
          values: {
            axis: fieldLabel,
            max: OffsetConfig.max,
          }
        });
      }
    }
  }

  private validateZeroAtDistance(value: number): void {
    if (value < ZeroAtDistanceConfig.min) {
      this.errors.push({
        localeStringKey: LocaleKeys.MinZeroDistance,
        values: {
          min: ZeroAtDistanceConfig.min,
        }
      })
    }

    if (value > ZeroAtDistanceConfig.max) {
      this.errors.push({
        localeStringKey: LocaleKeys.MaxZeroDistance,
        values: {
          max: ZeroAtDistanceConfig.max,
        }
      })
    }
  }
}
