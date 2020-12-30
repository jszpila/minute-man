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
import Field, { LabelElementType } from "../../../../Field";
import FieldLabelWithHint from "../../../../Field/FieldLabelWithHint";
import SettingsStore from "../../../Settings/SettingsStore";
import { ClickulatorContext } from "../../context";
import {
  HorizontalDirectionOptions,
  VerticalDirectionOptions,
} from "../../data/DirectionListOptions";
import AdjustmentSelect from "../AdjustmentSelect";
import PointOfImpactInput from "../PointOfImpactInput";
import ZeroAtDistanceInput from "../ZeroAtDistanceInput";

export default function FieldSet() {
  const settings = SettingsStore.getInstance().clickulator;
  const offsetUnit = getLocalizedOffsetUnit();

  return (
    <ClickulatorContext.Consumer>
      {(value) => (
        <fieldset className="form__fieldset">
          <fieldset className="form__fieldset">
            <legend className="form__fieldset__legend">Point of Impact</legend>
            <Field
              inputName="horizontalOffsetDistance"
              labelText={
                <FieldLabelWithHint
                  messageId="clickulator.horizontalOffsetLabel"
                  hintText={offsetUnit}
                />
              }
              labelElementType={LabelElementType.Span}
            >
              <PointOfImpactInput
                axis="Horizontal"
                directions={HorizontalDirectionOptions}
                directionValue={value.horizontalOffsetDirection}
                directionUpdaterFn={value.setHorizontalOffsetDirection}
                distanceValue={value.horizontalOffsetDistance}
                distanceUpdaterFn={value.setHorizontalOffsetDistance}
              />
            </Field>
            <Field
              inputName="verticalOffsetDistance"
              labelText={
                <FieldLabelWithHint
                  messageId="clickulator.verticalOffsetLabel"
                  hintText={offsetUnit}
                />
              }
              labelElementType={LabelElementType.Span}
            >
              <PointOfImpactInput
                axis="Vertical"
                directions={VerticalDirectionOptions}
                directionValue={value.verticalOffsetDirection}
                directionUpdaterFn={value.setVerticalOffsetDirection}
                distanceValue={value.verticalOffsetDistance}
                distanceUpdaterFn={value.setVerticalOffsetDistance}
              />
            </Field>
          </fieldset>
          <fieldset className="form__fieldset">
            <legend className="form__fieldset__legend">General</legend>
            <Field
              inputName="zeroAtDistance"
              labelText={
                <FieldLabelWithHint
                  messageId="clickulator.zeroAtDistanceLabel"
                  hintText={getLocalizedDistanceUnit()}
                />
              }
            >
              <ZeroAtDistanceInput
                updaterFn={value.setZeroAtDistance}
                value={settings.zeroAtDistance}
              />
            </Field>
            <Field
              inputName="adjustmentIncrement"
              labelText={
                <FormattedMessage id="clickulator.adjustmentIncrementLabel" />
              }
            >
              <AdjustmentSelect
                updaterFn={value.setAdjustmentIncrement}
                value={settings.adjustmentIncrement}
              />
            </Field>
          </fieldset>
        </fieldset>
      )}
    </ClickulatorContext.Consumer>
  );
}
