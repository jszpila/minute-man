/**
 *
 * Settings
 * App level settings
 *
 */

import { RouteComponentProps } from "@reach/router";
import React, { useContext } from "react";

import randomizeInputName from "../../../../util/RandomizeInputName";
import Field from "../../../Field/Field";
import AdjustmentSelect from "../../Clickulator/components/AdjustmentSelect";
import ZeroAtDistanceInput from "../../Clickulator/components/ZeroAtDistanceInput";
import { ClickulatorContext } from "../../Clickulator/context";
import SettingsStore from "../SettingsStore";
import { FormattedMessage } from "react-intl";
import { getLocalizedDistanceUnit } from "../../../../util/L10n";

export default function ClickulatorSettings(props: RouteComponentProps) {
  const context = useContext(ClickulatorContext);
  const settings = SettingsStore.getInstance();

  const zeroLabel = (
    <>
      <FormattedMessage id="clickulator.zeroAtDistanceLabel" />
      <i className="field__label__hint txt--smaller txt--muted">
        ({getLocalizedDistanceUnit()})
      </i>
    </>
  );

  const inputNames = {
    zeroDist: randomizeInputName("zeroAtDistance"),
    opticInc: randomizeInputName("adjustmentIncrement"),
  };

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
      <Field inputName={inputNames.zeroDist} labelText={zeroLabel}>
        <ZeroAtDistanceInput
          name={inputNames.zeroDist}
          updaterFn={onZeroAtDistanceChange}
          value={settings.clickulator.zeroAtDistance}
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
          updaterFn={onAdjustmentIncrementChange}
          value={settings.clickulator.adjustmentIncrement}
        />
      </Field>
    </fieldset>
  );
}
