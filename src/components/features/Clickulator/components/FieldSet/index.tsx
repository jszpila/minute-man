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

  // NOTE: use randomized input names to prevent auto-fill behavior
  const inputNames = {
    hOffsetDist: randomizeInputName("horizontalOffsetDistance"),
    vOffsetDist: randomizeInputName("verticalOffsetDistance"),
    zeroDist: randomizeInputName("zeroAtDistance"),
    opticInc: randomizeInputName("adjustmentIncrement"),
  };

  return (
    <ClickulatorContext.Consumer>
      {(value) => (
        <fieldset className="form__fieldset">
          <fieldset className="form__fieldset">
            <legend className="form__fieldset__legend">Point of Impact</legend>
            <Field
              inputName={inputNames.hOffsetDist}
              labelText={
                <FieldLabelWithHint
                  messageId="clickulator.verticalOffsetLabel"
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
                name={inputNames.hOffsetDist}
              />
            </Field>
            <Field
              inputName={inputNames.vOffsetDist}
              labelText={
                <FieldLabelWithHint
                  messageId="clickulator.horizontalOffsetLabel"
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
                name={inputNames.vOffsetDist}
              />
            </Field>
          </fieldset>
          <fieldset className="form__fieldset">
            <legend className="form__fieldset__legend">General</legend>
            <Field
              inputName={inputNames.zeroDist}
              labelText={
                <FieldLabelWithHint
                  messageId="clickulator.zeroAtDistanceLabel"
                  hintText={getLocalizedDistanceUnit()}
                />
              }
            >
              <ZeroAtDistanceInput
                name={inputNames.zeroDist}
                updaterFn={value.setZeroAtDistance}
                value={settings.zeroAtDistance}
              />
            </Field>
            <Field
              inputName={inputNames.opticInc}
              labelText={
                <FormattedMessage id="clickulator.adjustmentIncrementLabel" />
              }
            >
              <AdjustmentSelect
                name={inputNames.opticInc}
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
