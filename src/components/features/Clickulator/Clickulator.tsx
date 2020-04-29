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

import { RouteComponentProps } from '@reach/router';
import React, { SyntheticEvent, useState } from 'react';
import INavigationItem from '../../../interfaces/NavigationItem';
import Calculator from './Calculator';
import FieldSet from './components/FieldSet';
import ResultsModal from './components/Results';
import { ClickulatorContext, IClickulatorContext } from './context';
import { ClickulatorDefaultValues } from './data/Defaults';
import Validator from './validation/Validator';
import FeatureWithBottomButtonLayout from '../../layouts/FeatureWithBottomButtonLayout';
import SettingsStore from '../Settings/SettingsStore';

import './clickulator.scss';

export const ClickulatorNavConfig: INavigationItem = {
  route: '/',
  icon: 'gps_fixed',
  displayName: 'Zero Tool',
};

const defaults = ClickulatorDefaultValues;

export default function Clickulator(props: RouteComponentProps) {
  // Local state
  const [shouldShowResultsModal, setShouldShowResultsModal] = useState<boolean>(defaults.shouldShowResultsModal);

  // FIXME: better way that avoids duplicate setting of values?
  // App context state
  const [horizontalOffsetDistance, setHorizontalOffsetDistance] = useState<number | undefined>(defaults.horizontalOffsetDistance);
  const [horizontalOffsetDirection, setHorizontalOffsetDirection] = useState<string>(defaults.horizontalOffsetDirection);
  const [verticalOffsetDistance, setVerticalOffsetDistance] = useState<number | undefined>(defaults.verticalOffsetDistance);
  const [verticalOffsetDirection, setVerticalOffsetDirection] = useState<string>(defaults.verticalOffsetDirection);
  const [zeroAtDistance, setZeroAtDistance] = useState<number>(defaults.zeroAtDistance);
  const [opticAdjustmentIncrement, setOpticAdjustmentIncrement] = useState<number>(defaults.opticAdjustmentIncrement);
  const [isValid, setIsValid] = useState<boolean>(defaults.isValid);
  const [errors, setErrors] = useState<Array<string>>(defaults.errors);
  const [corrections, setCorrections] = useState<Array<string>>(defaults.corrections);

  const settings = SettingsStore.getInstance();

  // FIXME: better way to make this manageable?
  const contextValue: IClickulatorContext = {
    horizontalOffsetDistance,
    setHorizontalOffsetDistance,
    horizontalOffsetDirection,
    setHorizontalOffsetDirection,
    verticalOffsetDistance,
    setVerticalOffsetDistance,
    verticalOffsetDirection,
    setVerticalOffsetDirection,
    zeroAtDistance,
    setZeroAtDistance,
    opticAdjustmentIncrement,
    setOpticAdjustmentIncrement,
    shouldShowResultsModal,
    setShouldShowResultsModal,
    isValid: isValid,
    setIsValid,
    errors,
    setErrors,
    corrections,
    setCorrections,
  }

  // TODO: probably also a better way to do this
  function onResetClick(): void {
    setHorizontalOffsetDistance(defaults.horizontalOffsetDistance);
    setHorizontalOffsetDirection(defaults.horizontalOffsetDirection);
    setVerticalOffsetDistance(defaults.horizontalOffsetDistance);
    setVerticalOffsetDirection(defaults.horizontalOffsetDirection);
    setZeroAtDistance(settings.clickulator.zeroAtDistance);
    setOpticAdjustmentIncrement(settings.clickulator.zeroAtDistance);
  }

  const buttons = 
    <div className="button-container">
      <button
        className="button button--danger button--yuge button--flex-1"
        onClick={ onResetClick }
        type="reset">reset</button>
      <button
        className="button button--primary button--yuge button--flex-3"
        onClick={ onCalculateClick }
        type="button">send it</button>
    </div>

  return (
    <ClickulatorContext.Provider value={ contextValue }>
      <ResultsModal />

      <form
        id="Clickulator"
        className="form">
        <FeatureWithBottomButtonLayout
          mainAreaContent={ <FieldSet/> }
          buttonAreaContent={ buttons } />
      </form>
    </ClickulatorContext.Provider>
  );

  function onCalculateClick(event: SyntheticEvent): void {
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

      setCorrections(calculator.corrections);
    }
    
    setErrors(validator.errors);
    setIsValid(validator.isValid);
    setShouldShowResultsModal(!shouldShowResultsModal);
  }
}
