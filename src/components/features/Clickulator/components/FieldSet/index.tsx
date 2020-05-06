/**
 * FieldSet
 * Presentational component for inputs
 */

import React from 'react';

import RandomizeInputName from '../../../../../util/RandomizeInputName';
import Field from '../../../../Field/Field';
import SettingsStore from '../../../Settings/SettingsStore';
import { ClickulatorContext } from '../../context';
import { HorizontalDirectionOptions, VerticalDirectionOptions } from '../../data/DirectionListOptions';
import AdjustmentSelect from '../AdjustmentSelect';
import PointOfImpactInput from '../PointOfImpactInput';
import ZeroAtDistanceInput from '../ZeroAtDistanceInput';

export default function FieldSet() {
  const settings = SettingsStore.getInstance().clickulator;

  const vertLabel = <>Vert. Offset <i className="field__label__hint txt--smaller txt--muted">(inches)</i></>;
  const horizLabel = <>Horiz. Offset <i className="field__label__hint txt--smaller txt--muted">(inches)</i></>;
  const zeroLabel = <>Zero Distance <i className="field__label__hint txt--smaller txt--muted">(yards)</i></>;

  // NOTE: use randomized input names to prevent auto-fill behavior
  const inputNames = {
    hOffsetDist: RandomizeInputName('horizontalOffsetDistance'),
    vOffsetDist: RandomizeInputName('verticalOffsetDistance'),
    zeroDist: RandomizeInputName('zeroAtDistance'),
    opticInc: RandomizeInputName('adjustmentIncrement'),
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
            labelText="Adjustment Increment">
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
