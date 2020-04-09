/**
 *                    
 * 8""""8 8     8  8""""8 8   8  8   8 8     8""""8 ""8"" 8"""88 8"""8  
 * 8    " 8     8  8    " 8   8  8   8 8     8    8   8   8    8 8   8  
 * 8e     8e    8e 8e     8eee8e 8e  8 8e    8eeee8   8e  8    8 8eee8e 
 * 88     88    88 88     88   8 88  8 88    88   8   88  8    8 88   8 
 * 88   e 88    88 88   e 88   8 88  8 88    88   8   88  8    8 88   8 
 * 88eee8 88eee 88 88eee8 88   8 88ee8 88eee 88   8   88  8eeee8 88   8  
 *                                                                 
 * Calibrate your optic with a few clicks. On your phone, even!
 *
 */

import React, { SyntheticEvent, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import FeatureWithBottomButtonLayout from '../../layouts/FeatureWithBottomButtonLayout/FeatureWithBottomButtonLayout';
import FieldSet from './components/FieldSet';
import ResultsModal from './components/Results';
import { FeatureContext, IFeatureContext } from './context';
import { DefaultValues } from './data/Defaults';
import Validator from './validation/Validator';
import Calculator from './Calculator';

import './clickulator.css';

export const ClickulatorNavConfig = {
  route: '/',
  icon: 'gps_fixed',
  displayName: 'Zero Tool',
};

export default function Clickulator(props: RouteComponentProps) {
  // Local state
  const [shouldShowResultsModal, updateShouldShowResultsModal] = useState<boolean>(DefaultValues.shouldShowResultsModal);

  // FIXME: better way that avoids duplicate setting of values?
  // App context state
  const [horizontalOffsetDistance, updateHorizontalOffsetDistance] = useState<number | undefined>(DefaultValues.horizontalOffsetDistance);
  const [horizontalOffsetDirection, updateHorizontalOffsetDirection] = useState<string>(DefaultValues.horizontalOffsetDirection);
  const [verticalOffsetDistance, updateVerticalOffsetDistance] = useState<number | undefined>(DefaultValues.verticalOffsetDistance);
  const [verticalOffsetDirection, updateVerticalOffsetDirection] = useState<string>(DefaultValues.verticalOffsetDirection);
  const [zeroAtDistance, updateZeroAtDistance] = useState<number>(DefaultValues.zeroAtDistance);
  const [opticAdjustmentIncrement, updateOpticAdjustmentIncrement] = useState<number>(DefaultValues.opticAdjustmentIncrement);
  const [isValid, updateIsValid] = useState<boolean>(DefaultValues.isValid);
  const [errors, updateErrors] = useState<Array<string>>(DefaultValues.errors);
  const [corrections, updateCorrections] = useState<Array<string>>(DefaultValues.corrections);

  // FIXME: better way to make this manageable?
  const contextValue: IFeatureContext = {
    horizontalOffsetDistance,
    updateHorizontalOffsetDistance,
    horizontalOffsetDirection,
    updateHorizontalOffsetDirection,
    verticalOffsetDistance,
    updateVerticalOffsetDistance,
    verticalOffsetDirection,
    updateVerticalOffsetDirection,
    zeroAtDistance,
    updateZeroAtDistance,
    opticAdjustmentIncrement,
    updateOpticAdjustmentIncrement,
    shouldShowResultsModal,
    updateShouldShowResultsModal,
    isValid: isValid,
    updateIsValid: updateIsValid,
    errors,
    updateErrors,
    corrections,
    updateCorrections,
  }

  // TODO: probably also a better way to do this
  function resetForm(): void {
    updateHorizontalOffsetDistance(DefaultValues.horizontalOffsetDistance);
    updateHorizontalOffsetDirection(DefaultValues.horizontalOffsetDirection);
    updateVerticalOffsetDistance(DefaultValues.horizontalOffsetDistance);
    updateVerticalOffsetDirection(DefaultValues.horizontalOffsetDirection);
    updateZeroAtDistance(DefaultValues.zeroAtDistance);
    updateOpticAdjustmentIncrement(DefaultValues.opticAdjustmentIncrement);
  }

  // TODO: component
  const buttons = 
    <div className="button-container">
      <button
        className="button button--danger button--yuge button--flex-1 button--push-r"
        onClick={resetForm}
        type="reset">reset</button>
      <button
        className="button button--primary button--yuge button--flex-3 button--push-l"
        onClick={onClick}
        type="button">send it</button>
    </div>

  return (
    <FeatureContext.Provider value={contextValue}>
      <ResultsModal />

      <form
        id="Clickulator"
        className="form">
        <FeatureWithBottomButtonLayout
          content={<FieldSet/>}
          button={buttons} />
      </form>
    </FeatureContext.Provider>
  );

  function onClick(event: SyntheticEvent): void {
    event.preventDefault();

    const validator = Validator.getInstance();

    validator.validate({
      horizontalOffsetDistance,
      verticalOffsetDistance,
      zeroAtDistance
    });

    if (validator.isValid) {
      const calculator = Calculator.getInstance();
      
      calculator.generateCorrectionsList({
        horizontalOffsetDistance,
        horizontalOffsetDirection,
        verticalOffsetDistance,
        verticalOffsetDirection,
        opticAdjustmentIncrement,
        zeroAtDistance,
      });

      updateCorrections(calculator.corrections);
    }
    
    updateErrors(validator.errors);
    updateIsValid(validator.isValid);
    updateShouldShowResultsModal(!shouldShowResultsModal);
  }
}
