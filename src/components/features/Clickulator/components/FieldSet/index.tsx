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

export default function FieldSet() {
  const vertLabel = <>Vert. Offset <i className="field__label__hint txt--smaller txt--muted">(inches)</i></>;
  const horizLabel = <>Horiz. Offset <i className="field__label__hint txt--smaller txt--muted">(inches)</i></>;
  const zeroLabel = <>Zero Distance <i className="field__label__hint txt--smaller txt--muted">(yards)</i></>;

  return (
    <FeatureContext.Consumer>
      {value =>
        <fieldset className="form__fieldset">
          {/* Uncomment title when there are > 1 feature */}
          {/* <legend className="txt__heading-2">Clickulator</legend> */}
          <Field
            inputName="horizontalOffsetDistance"
            labelText={horizLabel}>
            <PointOfImpactInput
              directions={HorizontalDirectionOptions}
              directionValue={value.horizontalOffsetDirection}
              directionUpdaterFn={value.updateHorizontalOffsetDirection}
              distanceValue={value.horizontalOffsetDistance}
              distanceUpdaterFn={value.updateHorizontalOffsetDistance}
              name="horizontalOffsetDistance"/>
          </Field>
          <Field
            inputName="verticalOffsetDistance"
            labelText={vertLabel}>
            <PointOfImpactInput
              directions={VerticalDirectionOptions}
              directionValue={value.verticalOffsetDirection}
              directionUpdaterFn={value.updateVerticalOffsetDirection}
              distanceValue={value.verticalOffsetDistance}
              distanceUpdaterFn={value.updateVerticalOffsetDistance}
              name="verticalOffsetDistance"/>
          </Field>
          <Field
            inputName="zeroAtDistance"
            labelText={zeroLabel}>
            <ZeroAtDistanceInput
              updaterFn={value.updateZeroAtDistance}
              value={value.zeroAtDistance}/>
          </Field>
          <Field
            inputName="opticAdjustmentIncrement"
            labelText="Optic Increment">
              <OpticAdjustmentSelect
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
