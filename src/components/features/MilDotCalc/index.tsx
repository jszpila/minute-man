// MilDot Calc

import { RouteComponentProps } from "@reach/router";
import React, { SyntheticEvent, useState } from "react";
import { FormattedMessage } from "react-intl";

import INavigationItem from "../../../interfaces/NavigationItem";
import FeatureWithBottomButtonLayout from "../../layouts/FeatureWithBottomButtonLayout";
import Calculator, { ICalculatorResult } from "./Calculator";
import FieldSet from "./components/FieldSet";
import ResultsModal from "./components/Results";
import { IMilDotCalcContext, MilDotCalcContenxt } from "./context";
import MilDotCalcDefaultSettings from "./data/Defaults";
import MilDotCalcValidator, { IValidationError } from "./validation/Validator";

export const MilDotCalcNavConfig: INavigationItem = {
  route: "/mildotcalc",
  icon: "more_vert",
  displayNameKey: "mildotcalc.title",
};

const defaults = MilDotCalcDefaultSettings;

export default function MilDotCalc(props: RouteComponentProps) {
  const [milSize, setMilSize] = useState<number | undefined>(defaults.milSize);
  const [physicalSize, setPhysicalSize] = useState<number | undefined>(
    defaults.physicalSize
  );
  const [distance, setDistance] = useState<number | undefined>(
    defaults.distance
  );
  const [isValid, setIsValid] = useState<boolean>(defaults.isValid);
  const [shouldShowResultsModal, setShouldShowResultsModal] = useState<boolean>(
    defaults.shouldShowResultsModal
  );
  const [errors, setErrors] = useState<Array<IValidationError>>(
    defaults.errors
  );
  const [result, setResult] = useState<ICalculatorResult | undefined>(
    defaults.result
  );

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
    setResult,
  };

  function onReset(): void {
    setMilSize(defaults.milSize);
    setPhysicalSize(defaults.physicalSize);
    setDistance(defaults.distance);
    setErrors(defaults.errors);
    setResult(defaults.result);
  }

  function onSubmit(event: SyntheticEvent): void {
    event.preventDefault();

    const validator = MilDotCalcValidator.getInstance();
    const calculator = Calculator.getInstance();

    validator.validate({ milSize, physicalSize, distance });

    if (validator.isValid) {
      calculator.calculate({ milSize, physicalSize, distance });
      setResult(calculator.result);
    }

    setErrors(validator.errors);
    setIsValid(validator.isValid);
    setShouldShowResultsModal(!shouldShowResultsModal);
  }

  const buttons = (
    <div className="button-container">
      <button
        className="button button--danger button--yuge button--flex-1"
        type="reset"
      >
        <FormattedMessage id="buttons.reset" />
      </button>
      <button
        className="button button--primary button--yuge button--flex-3"
        type="submit"
      >
        <FormattedMessage id="buttons.submit" />
      </button>
    </div>
  );

  return (
    <MilDotCalcContenxt.Provider value={contextValue}>
      <ResultsModal />
      <form
        id="MilDotCalc"
        className="form"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <FeatureWithBottomButtonLayout
          mainAreaContent={
            <>
              <h2 className="txt__heading-2">
                <FormattedMessage id="mildotcalc.title" />
              </h2>
              <FieldSet />
            </>
          }
          buttonAreaContent={buttons}
        />
      </form>
    </MilDotCalcContenxt.Provider>
  );
}
