/**
 *                    
 * Settings                                                  
 * App level settings
 *
 */

import { RouteComponentProps } from '@reach/router';
import React, { useContext } from 'react';

import RandomizeInputName from '../../../../util/RandomizeInputName';
import Field from '../../../Field/Field';
import AdjustmentSelect from '../../Clickulator/components/AdjustmentSelect';
import ZeroAtDistanceInput from '../../Clickulator/components/ZeroAtDistanceInput';
import { ClickulatorContext } from '../../Clickulator/context';
import SettingsStore from '../SettingsStore';

export default function ClickulatorSettings(props: RouteComponentProps) {
  const context = useContext(ClickulatorContext);
  const settings = SettingsStore.getInstance();
  const zeroLabel = <>Zero Distance <i className="field__label__hint txt--smaller txt--muted">(yards)</i></>;
  const inputNames = {
    zeroDist: RandomizeInputName('zeroAtDistance'),
    opticInc: RandomizeInputName('adjustmentIncrement'),
  }

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
      <legend className="form__fieldset__legend">Zero Calc Default Settings</legend>
      <Field
        inputName={ inputNames.zeroDist }
        labelText={ zeroLabel }>
        <ZeroAtDistanceInput
          name={ inputNames.zeroDist }
          updaterFn={ onZeroAtDistanceChange }
          value={ settings.clickulator.zeroAtDistance } />
      </Field>
      <Field
        inputName={ inputNames.opticInc }
        labelText="Adjustment Increment">
          <AdjustmentSelect
            name={ inputNames.opticInc }
            updaterFn={ onAdjustmentIncrementChange }
            value={ settings.clickulator.adjustmentIncrement } />
        </Field>
    </fieldset>
  );
}
