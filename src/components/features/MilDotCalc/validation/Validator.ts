/**
 * Validator
 * Handles MilDotCalc validation logic
 */

import { IInputConfig, MilSizeConfig, DistanceConfig, PhysicalSizeConfig } from '../data/InputConfig';
import { getLocalizedStringByKey, getLocalizedDistanceUnit, getLocalizedOffsetUnit } from '../../../../util/L10n';
import SettingsStore from '../../Settings/SettingsStore';

interface IValidatorData {
  milSize: number | undefined,
  physicalSize: number | undefined,
  distance: number | undefined,
}

export interface IValidationError {
  localeStringKey: string,
  values?: any | undefined,
}

export default class MilDotCalcValidator {
  private static instance: MilDotCalcValidator;
  private settings = SettingsStore.getInstance().app;

  public errors: Array<IValidationError> = [];

  public get isValid(): boolean {
    return this.errors.length === 0;
  }

  static getInstance(): MilDotCalcValidator {
    if (!MilDotCalcValidator.instance) {
      MilDotCalcValidator.instance = new MilDotCalcValidator();
    }

    return MilDotCalcValidator.instance;
  }

  public validate(data: IValidatorData): void {
    this.errors = [];
    this.validatePresence(data);
    this.validateProperty(data.milSize, 'milSize', MilSizeConfig, getLocalizedStringByKey('units.mil'));
    this.validateProperty(data.physicalSize, 'physicalSize', PhysicalSizeConfig, getLocalizedOffsetUnit());
    this.validateProperty(data.distance, 'distance', DistanceConfig, getLocalizedDistanceUnit());
  }

  private validatePresence(data: IValidatorData): void {
    const { milSize, physicalSize, distance } = data;
    let providedFields = 0

    providedFields += distance === undefined ? 0 : 1;
    providedFields += milSize === undefined ? 0 : 1;
    providedFields += physicalSize === undefined ? 0 : 1;

    if (providedFields < 2) {
      this.errors.push({localeStringKey: 'mildotcalc.errors.atLeastTwoOf'})
    }
  }

  private validateProperty(value: number | undefined, name: string, config: IInputConfig, unit: string): void {
    if (value !== undefined) {
      if (value > config.max) {
        this.errors.push({
          localeStringKey: `mildotcalc.errors.${name}.max`,
          values: {
            max: config.max,
            unit: unit,
          }
        })
      }

      if (value < config.min) {
        this.errors.push({
          localeStringKey: `mildotcalc.errors.${name}.min`,
          values: {
            max: config.min,
            unit: unit,
          }
        })
      }
    }
  }
}
