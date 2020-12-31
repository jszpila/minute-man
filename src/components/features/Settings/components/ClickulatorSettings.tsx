/**
 *
 * Clickulator Settings
 * Feature-level settings
 *
 */

import { RouteComponentProps } from "@reach/router";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";

import { getLocalizedDistanceUnit } from "../../../../util/L10n";
import Field from "../../../Field";
import FieldLabelWithHint from "../../../Field/FieldLabelWithHint";
import AdjustmentSelect from "../../Clickulator/components/AdjustmentSelect";
import ZeroAtDistanceInput from "../../Clickulator/components/ZeroAtDistanceInput";
import { ClickulatorContext } from "../../Clickulator/context";
import SettingsStore from "../SettingsStore";

export default function ClickulatorSettings(props: RouteComponentProps) {
  const context = useContext(ClickulatorContext);
  const settings = SettingsStore.getInstance();

  function onZeroAtDistanceChange(value: number): void {
    settings.clickulator.zeroAtDistance = value;
    context.setZeroAtDistance(value);
  }

  function onAdjustmentIncrementChange(value: number): void {
    settings.clickulator.adjustmentIncrement = value;
    context.setAdjustmentIncrement(value);
  }

  return (
    <fieldset className="form__fieldset">
      <legend className="form__fieldset__legend">
        <FormattedMessage id="settings.clickulator.title" />
      </legend>
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
          updaterFn={onZeroAtDistanceChange}
          value={settings.clickulator.zeroAtDistance}
        />
      </Field>
      <Field
        inputName="adjustmentIncrement"
        labelText={
          <FormattedMessage id="clickulator.adjustmentIncrementLabel" />
        }
      >
        <AdjustmentSelect
          updaterFn={onAdjustmentIncrementChange}
          value={settings.clickulator.adjustmentIncrement}
        />
      </Field>
    </fieldset>
  );
}
