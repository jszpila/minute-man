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

  return (
    <MilDotCalcContenxt.Consumer>
      {(value) => (
        <fieldset className="form__fieldset">
          <Callout>
            <FormattedMessage id="mildotcalc.blurb" />
          </Callout>
          <Field
            inputName="milSize"
            labelText={
              <FieldLabelWithHint
                messageId={milSizeLabelId}
                hintText={<FormattedMessage id="units.mil" />}
              />
            }
            labelElementType={LabelElementType.Span}
          >
            <RestrictedNumericInput
              value={defaults.milSize}
              updaterFn={value.setMilSize}
            />
          </Field>
          <Field
            inputName="physicalSize"
            labelText={
              <FieldLabelWithHint
                messageId={physicalSizeLabelId}
                hintText={getLocalizedOffsetUnit()}
              />
            }
            labelElementType={LabelElementType.Span}
          >
            <RestrictedNumericInput
              value={defaults.physicalSize}
              updaterFn={value.setPhysicalSize}
            />
          </Field>
          <Field
            inputName="distance"
            labelText={
              <FieldLabelWithHint
                messageId={distanceLabelId}
                hintText={getLocalizedDistanceUnit()}
              />
            }
            labelElementType={LabelElementType.Span}
          >
            <RestrictedNumericInput
              value={defaults.distance}
              updaterFn={value.setDistance}
            />
          </Field>
        </fieldset>
      )}
    </MilDotCalcContenxt.Consumer>
  );
}
