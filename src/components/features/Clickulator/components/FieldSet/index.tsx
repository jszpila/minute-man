/**
 * FieldSet
 * Presentational component for inputs
 */

import React from 'react';
import Field from '../../../../Field/Field';
import OpticAdjustmentSelect from '../OpticAdjustmentSelect';
import { ClickulatorContext } from '../../context';
import ZeroAtDistanceInput from '../ZeroAtDistanceInput';
import PointOfImpactInput from '../PointOfImpactInput';
import { HorizontalDirectionOptions, VerticalDirectionOptions } from '../../data/DirectionListOptions';
import RandomizeInputName from '../../../../../util/RandomizeInputName';
import SettingsStore from '../../../Settings/SettingsStore';

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
    opticInc: RandomizeInputName('opticAdjustmentIncrement'),
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
            labelText="Optic Increment">
              <OpticAdjustmentSelect
                name={ inputNames.opticInc }
                updaterFn={ value.setOpticAdjustmentIncrement }
                value={ settings.opticAdjustmentIncrement } />
            </Field>
            {/* Advanced options:
              - barrel length
              - bullet grain
              - ballistic coefficient
              - velocity?
            */}
        </fieldset>
      }
    </ClickulatorContext.Consumer>
  );
}
