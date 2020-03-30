/**
 * Context
 * Datastore for Clickulator feature
 */

import React, { Dispatch, SetStateAction } from 'react';
import { DefaultValues } from './data/Defaults';

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
  horizontalOffsetDistance: DefaultValues.horizontalOffsetDistance,
  updateHorizontalOffsetDistance: (): void => {},
  horizontalOffsetDirection: DefaultValues.horizontalOffsetDirection,
  updateHorizontalOffsetDirection: (): void => {},
  verticalOffsetDistance: DefaultValues.verticalOffsetDistance,
  updateVerticalOffsetDistance: (): void => {},
  verticalOffsetDirection: DefaultValues.verticalOffsetDirection,
  updateVerticalOffsetDirection: (): void => {},
  zeroAtDistance: DefaultValues.zeroAtDistance,
  updateZeroAtDistance: (): void => {},
  opticAdjustmentIncrement: DefaultValues.opticAdjustmentIncrement,
  updateOpticAdjustmentIncrement: (): void => {},
  shouldShowResultsModal: DefaultValues.shouldShowResultsModal,
  updateShouldShowResultsModal: (): void => {},
  isValid: DefaultValues.isValid,
  updateIsValid: (): void => {},
  errors: DefaultValues.errors,
  updateErrors: (): void => {},
  corrections: DefaultValues.corrections,
  updateCorrections: (): void => {},
}

export const FeatureContext = React.createContext(initialContext);
