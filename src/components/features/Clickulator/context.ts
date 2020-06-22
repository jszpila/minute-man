/**
 * Context
 * Datastore for Clickulator feature
 */

import React, { Dispatch, SetStateAction } from 'react';

import { ICalculatorResult } from './Calculator';
import ClickulatorDefaultValues from './data/Defaults';
import { IValidationError } from './validation/Validator';

const defaults = ClickulatorDefaultValues;

export interface IClickulatorContext {
  horizontalOffsetDistance: number | undefined,
  setHorizontalOffsetDistance: (Dispatch<SetStateAction<number | undefined>>),
  horizontalOffsetDirection: string,
  setHorizontalOffsetDirection: (Dispatch<SetStateAction<string>>),
  verticalOffsetDistance: number | undefined,
  setVerticalOffsetDistance: (Dispatch<SetStateAction<number | undefined>>),
  verticalOffsetDirection: string,
  setVerticalOffsetDirection: (Dispatch<SetStateAction<string>>),
  zeroAtDistance: number,
  setZeroAtDistance: (Dispatch<SetStateAction<number>>),
  adjustmentIncrement: number,
  setAdjustmentIncrement: (Dispatch<SetStateAction<number>>),
  shouldShowResultsModal: boolean;
  setShouldShowResultsModal: (Dispatch<SetStateAction<boolean>>),
  isValid: boolean,
  setIsValid: (Dispatch<SetStateAction<boolean>>),
  errors: Array<IValidationError>,
  setErrors: (Dispatch<SetStateAction<Array<IValidationError>>>),
  corrections: ICalculatorResult,
  setCorrections: (Dispatch<SetStateAction<ICalculatorResult>>),
}

export const initialContext: IClickulatorContext = {
  horizontalOffsetDistance: defaults.horizontalOffsetDistance,
  setHorizontalOffsetDistance: (): void => {},
  horizontalOffsetDirection: defaults.horizontalOffsetDirection,
  setHorizontalOffsetDirection: (): void => {},
  verticalOffsetDistance: defaults.verticalOffsetDistance,
  setVerticalOffsetDistance: (): void => {},
  verticalOffsetDirection: defaults.verticalOffsetDirection,
  setVerticalOffsetDirection: (): void => {},
  zeroAtDistance: defaults.zeroAtDistance,
  setZeroAtDistance: (): void => {},
  adjustmentIncrement: defaults.adjustmentIncrement,
  setAdjustmentIncrement: (): void => {},
  shouldShowResultsModal: defaults.shouldShowResultsModal,
  setShouldShowResultsModal: (): void => {},
  isValid: defaults.isValid,
  setIsValid: (): void => {},
  errors: defaults.errors,
  setErrors: (): void => {},
  corrections: defaults.corrections,
  setCorrections: (): void => {},
}

export const ClickulatorContext = React.createContext(initialContext);
