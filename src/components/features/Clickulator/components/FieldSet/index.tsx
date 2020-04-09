/**
 * FieldSet
 * Presentational component for inputs
 */

import React from 'react';
import Field from '../../../../Field/Field';
import OpticAdjustmentSelect from '../OpticAdjustmentSelect';
import { FeatureContext } from '../../context';
import ZeroAtDistanceInput from '../ZeroAtDistanceInput';
import PointOfImpactInput from '../PointOfImpactInput';
import { HorizontalDirectionOptions, VerticalDirectionOptions } from '../../data/DirectionListOptions';
import RandomizeInputName from '../../../../../util/RandomizeInputName';

export default function FieldSet() {
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
    <FeatureContext.Consumer>
      {value =>
        <fieldset className="form__fieldset">
          <legend className="txt__heading-2">Zero Tool</legend>
          <Field
            inputName={inputNames.hOffsetDist}
            labelText={horizLabel}>
            <PointOfImpactInput
              directions={HorizontalDirectionOptions}
              directionValue={value.horizontalOffsetDirection}
              directionUpdaterFn={value.updateHorizontalOffsetDirection}
              distanceValue={value.horizontalOffsetDistance}
              distanceUpdaterFn={value.updateHorizontalOffsetDistance}
              name={inputNames.hOffsetDist}/>
          </Field>
          <Field
            inputName={inputNames.vOffsetDist}
            labelText={vertLabel}>
            <PointOfImpactInput
              directions={VerticalDirectionOptions}
              directionValue={value.verticalOffsetDirection}
              directionUpdaterFn={value.updateVerticalOffsetDirection}
              distanceValue={value.verticalOffsetDistance}
              distanceUpdaterFn={value.updateVerticalOffsetDistance}
              name={inputNames.vOffsetDist}/>
          </Field>
          <Field
            inputName={inputNames.zeroDist}
            labelText={zeroLabel}>
            <ZeroAtDistanceInput
              name={inputNames.zeroDist}
              updaterFn={value.updateZeroAtDistance}
              value={value.zeroAtDistance}/>
          </Field>
          <Field
            inputName={inputNames.opticInc}
            labelText="Optic Increment">
              <OpticAdjustmentSelect
                name={inputNames.opticInc}
                updaterFn={value.updateOpticAdjustmentIncrement}
                value={value.opticAdjustmentIncrement}/>
            </Field>
            {/* Advanced options:
              - barrel length
              - bullet grain
              - ballistic coefficient
              - velocity?
            */}
        </fieldset>
      }
    </FeatureContext.Consumer>
  );
}
