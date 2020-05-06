/**
 * Context
 * Datastore for Clickulator feature
 */

import React, { Dispatch, SetStateAction } from 'react';

import ClickulatorDefaultValues from './data/Defaults';

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
  errors: Array<string>,
  setErrors: (Dispatch<SetStateAction<Array<string>>>),
  corrections: Array<string>,
  setCorrections: (Dispatch<SetStateAction<Array<string>>>),
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
