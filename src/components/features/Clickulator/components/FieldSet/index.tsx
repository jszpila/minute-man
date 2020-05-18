/**
 * FieldSet
 * Presentational component for inputs
 */

import React from 'react';

import randomizeInputName from '../../../../../util/RandomizeInputName';
import Field from '../../../../Field/Field';
import SettingsStore from '../../../Settings/SettingsStore';
import { ClickulatorContext } from '../../context';
import { HorizontalDirectionOptions, VerticalDirectionOptions } from '../../data/DirectionListOptions';
import AdjustmentSelect from '../AdjustmentSelect';
import PointOfImpactInput from '../PointOfImpactInput';
import ZeroAtDistanceInput from '../ZeroAtDistanceInput';
import { FormattedMessage } from 'react-intl';
import { getLocalizedDistanceUnit, getLocalizedOffsetUnit } from '../../../../../util/L10n';

export default function FieldSet() {
  const settings = SettingsStore.getInstance().clickulator;
  const offsetUnit = getLocalizedOffsetUnit();
  const distanceUnit = getLocalizedDistanceUnit();

  const vertLabel = <>
    <FormattedMessage id="clickulator.horizontalOffsetLabel" /> 
    <i className="field__label__hint txt--smaller txt--muted">({ offsetUnit })</i></>;

  const horizLabel = <>
    <FormattedMessage id="clickulator.verticalOffsetLabel" /> 
    <i className="field__label__hint txt--smaller txt--muted">({ offsetUnit })</i></>;

  const zeroLabel = <>
    <FormattedMessage id="clickulator.zeroAtDistanceLabel" /> 
    <i className="field__label__hint txt--smaller txt--muted">({ distanceUnit })</i></>;
  
  const adjustmentLabel = <FormattedMessage id="clickulator.adjustmentIncrementLabel" />

  // NOTE: use randomized input names to prevent auto-fill behavior
  const inputNames = {
    hOffsetDist: randomizeInputName('horizontalOffsetDistance'),
    vOffsetDist: randomizeInputName('verticalOffsetDistance'),
    zeroDist: randomizeInputName('zeroAtDistance'),
    opticInc: randomizeInputName('adjustmentIncrement'),
  }

  return (
    <ClickulatorContext.Consumer>
      {value =>
        <fieldset className="form__fieldset">
          <Field
            inputName={ inputNames.hOffsetDist }
            labelText={ horizLabel }>
            <PointOfImpactInput
              directions={ HorizontalDirectionOptions }
              directionValue={ value.horizontalOffsetDirection }
              directionUpdaterFn={ value.setHorizontalOffsetDirection }
              distanceValue={ value.horizontalOffsetDistance }
              distanceUpdaterFn={ value.setHorizontalOffsetDistance }
              name={ inputNames.hOffsetDist } />
          </Field>
          <Field
            inputName={ inputNames.vOffsetDist }
            labelText={ vertLabel }>
            <PointOfImpactInput
              directions={ VerticalDirectionOptions }
              directionValue={ value.verticalOffsetDirection }
              directionUpdaterFn={ value.setVerticalOffsetDirection }
              distanceValue={ value.verticalOffsetDistance }
              distanceUpdaterFn={ value.setVerticalOffsetDistance }
              name={ inputNames.vOffsetDist } />
          </Field>
          <Field
            inputName={ inputNames.zeroDist }
            labelText={ zeroLabel }>
            <ZeroAtDistanceInput
              name={ inputNames.zeroDist }
              updaterFn={ value.setZeroAtDistance }
              value={ settings.zeroAtDistance } />
          </Field>
          <Field
            inputName={ inputNames.opticInc }
            labelText={ adjustmentLabel }>
              <AdjustmentSelect
                name={ inputNames.opticInc }
                updaterFn={ value.setAdjustmentIncrement }
                value={ settings.adjustmentIncrement } />
            </Field>
        </fieldset>
      }
    </ClickulatorContext.Consumer>
  );
}
