/**
 *  ___  ____ _______      _   _____       _      
 *  |  \/  (_) |  _  \    | | /  __ \     | |     
 *  | .  . |_| | | | |___ | |_| /  \/ __ _| | ___ 
 *  | |\/| | | | | | / _ \| __| |    / _` | |/ __|
 *  | |  | | | | |/ / (_) | |_| \__/\ (_| | | (__ 
 *  \_|  |_/_|_|___/ \___/ \__|\____/\__,_|_|\___|
 * 
 * Calculate things using Mil Dots
 * 
 */

import Calculator, { ICalculatorResult } from './Calculator';
import FieldSet from './components/FieldSet';
import ResultsModal from './components/Results';
import MilDotCalcDefaultSettings from './data/Defaults';
import MilDotCalcValidator, { IValidationError } from './validation/Validator';
import { RouteComponentProps } from '@reach/router';
import React, { SyntheticEvent, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import INavigationItem from '../../../interfaces/NavigationItem';
import FeatureWithBottomButtonLayout from '../../layouts/FeatureWithBottomButtonLayout';
import { IMilDotCalcContext, MilDotCalcContenxt } from './context';

export const MilDotCalcNavConfig: INavigationItem = {
  route: '/mildotcalc',
  icon: 'more_vert',
  displayNameKey: 'mildotcalc.title',
};

const defaults = MilDotCalcDefaultSettings;

export default function MilDotCalc(props: RouteComponentProps) {
  const [milSize, setMilSize] = useState<number | undefined>(defaults.milSize);
  const [physicalSize, setPhysicalSize] = useState<number | undefined>(defaults.physicalSize);
  const [distance, setDistance] = useState<number | undefined>(defaults.distance);
  const [isValid, setIsValid] = useState<boolean>(defaults.isValid);
  const [shouldShowResultsModal, setShouldShowResultsModal] = useState<boolean>(defaults.shouldShowResultsModal);
  const [errors, setErrors] = useState<Array<IValidationError>>(defaults.errors);
  const [result, setResult] = useState<ICalculatorResult | undefined>(defaults.result);

  const contextValue: IMilDotCalcContext = {
    milSize,
    setMilSize,
    physicalSize,
    setPhysicalSize,
    distance,
    setDistance,
    isValid,
    setIsValid,
    shouldShowResultsModal,
    setShouldShowResultsModal,
    errors,
    setErrors,
    result,
    setResult
  }

  function onResetClick(): void {
    setMilSize(defaults.milSize);
    setPhysicalSize(defaults.physicalSize);
    setDistance(defaults.distance);
    setErrors(defaults.errors);
    setResult(defaults.result);
  }

  function onSubmitClick(event: SyntheticEvent): void {
    const validator = MilDotCalcValidator.getInstance();
    const calculator = Calculator.getInstance();

    validator.validate({milSize, physicalSize, distance});

    if (validator.isValid) {
      calculator.calculate({milSize, physicalSize, distance});
      setResult(calculator.result);
    }

    console.log(validator.isValid, validator.errors)
    setErrors(validator.errors);
    setIsValid(validator.isValid);
    setShouldShowResultsModal(!shouldShowResultsModal);
  }

  const buttons = 
    <div className="button-container">
      <button
        className="button button--danger button--yuge button--flex-1"
        onClick={ onResetClick }
        type="reset">
          <FormattedMessage id="buttons.reset" />
        </button>
      <button
        className="button button--primary button--yuge button--flex-3"
        onClick={ onSubmitClick }
        type="button">
          <FormattedMessage id="buttons.submit" />
        </button>
    </div>

  return (
    <MilDotCalcContenxt.Provider value={ contextValue }>
      <ResultsModal />
      <form
        id="MilDotCalc"
        className="form">
        <FeatureWithBottomButtonLayout
          mainAreaContent={ 
            <>
              <h2 className="txt__heading-2"><FormattedMessage id="mildotcalc.title" /></h2>
              <FieldSet />
            </> 
          }
          buttonAreaContent={ buttons } />
      </form>
    </MilDotCalcContenxt.Provider>
  );
}
