/**
 * FieldSet
 * Presentational component for inputs
 */

import React from "react";
import { FormattedMessage } from "react-intl";

import {
  getLocalizedDistanceUnit,
  getLocalizedOffsetUnit,
} from "../../../../../util/L10n";
import randomizeInputName from "../../../../../util/RandomizeInputName";
import Callout from "../../../../Callout";
import Field, { LabelElementType } from "../../../../Field";
import FieldLabelWithHint from "../../../../Field/FieldLabelWithHint";
import RestrictedNumericInput from "../../../../RestrictedNumericInput";
import { MilDotCalcContenxt } from "../../context";
import MilDotCalcDefaultValues from "../../data/Defaults";

export default function FieldSet() {
  const milSizeLabelId = "mildotcalc.milSize";
  const physicalSizeLabelId = "mildotcalc.physicalSize";
  const distanceLabelId = "mildotcalc.distance";
  const defaults = MilDotCalcDefaultValues;

  // TODO: bake randomizeInputNames into Field?
  const inputNames = {
    milSize: randomizeInputName("milSize"),
    physicalSize: randomizeInputName("physicalSize"),
    distance: randomizeInputName("distance"),
  };

  return (
    <MilDotCalcContenxt.Consumer>
      {(value) => (
        <fieldset className="form__fieldset">
          <Callout>
            <FormattedMessage id="mildotcalc.blurb" />
          </Callout>
          <Field
            inputName={inputNames.milSize}
            labelText={
              <FieldLabelWithHint
                messageId={milSizeLabelId}
                hintText={<FormattedMessage id="units.mil" />}
              />
            }
            labelElementType={LabelElementType.Span}
          >
            <RestrictedNumericInput
              labelledBy={milSizeLabelId}
              name={inputNames.milSize}
              value={defaults.milSize}
              updaterFn={value.setMilSize}
            />
          </Field>
          <Field
            inputName={inputNames.physicalSize}
            labelText={
              <FieldLabelWithHint
                messageId={physicalSizeLabelId}
                hintText={getLocalizedOffsetUnit()}
              />
            }
            labelElementType={LabelElementType.Span}
          >
            <RestrictedNumericInput
              labelledBy={physicalSizeLabelId}
              name={inputNames.physicalSize}
              value={defaults.physicalSize}
              updaterFn={value.setPhysicalSize}
            />
          </Field>
          <Field
            inputName={inputNames.distance}
            labelText={
              <FieldLabelWithHint
                messageId={distanceLabelId}
                hintText={getLocalizedDistanceUnit()}
              />
            }
            labelElementType={LabelElementType.Span}
          >
            <RestrictedNumericInput
              labelledBy={distanceLabelId}
              name={inputNames.distance}
              value={defaults.distance}
              updaterFn={value.setDistance}
            />
          </Field>
        </fieldset>
      )}
    </MilDotCalcContenxt.Consumer>
  );
}
