/**
 * Context
 * Datastore for MilDotCalc feature
 */

import React, { Dispatch, SetStateAction } from 'react';
import MilDotCalcDefaultValues from './data/Defaults';
import { ICalculatorResult } from './Calculator';
import { IValidationError } from './validation/Validator';

const defaults = MilDotCalcDefaultValues;

export interface IMilDotCalcContext {
  milSize: number | undefined,
  setMilSize: (Dispatch<SetStateAction<number | undefined>>),
  physicalSize: number | undefined,
  setPhysicalSize: (Dispatch<SetStateAction<number | undefined>>),
  distance: number | undefined,
  setDistance: (Dispatch<SetStateAction<number | undefined>>),
  shouldShowResultsModal: boolean;
  setShouldShowResultsModal: (Dispatch<SetStateAction<boolean>>),
  isValid: boolean,
  setIsValid: (Dispatch<SetStateAction<boolean>>),
  errors: Array<IValidationError>,
  setErrors: (Dispatch<SetStateAction<Array<IValidationError>>>),
  result: ICalculatorResult | undefined,
  setResult: (Dispatch<SetStateAction<ICalculatorResult | undefined>>),
}

export const initialContext: IMilDotCalcContext = {
  milSize: defaults.milSize,
  setMilSize: (): void => {},
  physicalSize: defaults.physicalSize,
  setPhysicalSize: (): void => {},
  distance: defaults.distance,
  setDistance: (): void => {},
  shouldShowResultsModal: defaults.shouldShowResultsModal,
  setShouldShowResultsModal: (): void => {},
  isValid: defaults.isValid,
  setIsValid: (): void => {},
  errors: defaults.errors,
  setErrors: (): void => {},
  result: defaults.result,
  setResult: (): void => {}
}

export const MilDotCalcContenxt = React.createContext(initialContext);
