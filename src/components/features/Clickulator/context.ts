/**
 * Context
 * Datastore for Clickulator feature
 */

import React, { Dispatch, SetStateAction } from 'react';
import { DefaultValues } from './data/Defaults';

const defaults = DefaultValues;

export interface IFeatureContext {
  horizontalOffsetDistance: number | undefined,
  updateHorizontalOffsetDistance: (Dispatch<SetStateAction<number | undefined>>),
  horizontalOffsetDirection: string,
  updateHorizontalOffsetDirection: (Dispatch<SetStateAction<string>>),
  verticalOffsetDistance: number | undefined,
  updateVerticalOffsetDistance: (Dispatch<SetStateAction<number | undefined>>),
  verticalOffsetDirection: string,
  updateVerticalOffsetDirection: (Dispatch<SetStateAction<string>>),
  zeroAtDistance: number,
  updateZeroAtDistance: (Dispatch<SetStateAction<number>>),
  opticAdjustmentIncrement: number,
  updateOpticAdjustmentIncrement: (Dispatch<SetStateAction<number>>),
  shouldShowResultsModal: boolean;
  updateShouldShowResultsModal: (Dispatch<SetStateAction<boolean>>),
  isValid: boolean,
  updateIsValid: (Dispatch<SetStateAction<boolean>>),
  errors: Array<string>,
  updateErrors: (Dispatch<SetStateAction<Array<string>>>),
  corrections: Array<string>,
  updateCorrections: (Dispatch<SetStateAction<Array<string>>>),
}

export const initialContext: IFeatureContext = {
  horizontalOffsetDistance: defaults.horizontalOffsetDistance,
  updateHorizontalOffsetDistance: (): void => {},
  horizontalOffsetDirection: defaults.horizontalOffsetDirection,
  updateHorizontalOffsetDirection: (): void => {},
  verticalOffsetDistance: defaults.verticalOffsetDistance,
  updateVerticalOffsetDistance: (): void => {},
  verticalOffsetDirection: defaults.verticalOffsetDirection,
  updateVerticalOffsetDirection: (): void => {},
  zeroAtDistance: defaults.zeroAtDistance,
  updateZeroAtDistance: (): void => {},
  opticAdjustmentIncrement: defaults.opticAdjustmentIncrement,
  updateOpticAdjustmentIncrement: (): void => {},
  shouldShowResultsModal: defaults.shouldShowResultsModal,
  updateShouldShowResultsModal: (): void => {},
  isValid: defaults.isValid,
  updateIsValid: (): void => {},
  errors: defaults.errors,
  updateErrors: (): void => {},
  corrections: defaults.corrections,
  updateCorrections: (): void => {},
}

export const FeatureContext = React.createContext(initialContext);
