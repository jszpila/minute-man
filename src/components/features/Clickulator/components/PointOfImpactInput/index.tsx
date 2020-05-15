/**
 * PointOfImpactInput
 * Specify distance and direction deltas between actual and desired points-of-impact
 */

import React, { Dispatch, SetStateAction } from 'react';
import RestrictedNumericInput from '../../../../RestrictedNumericInput';
import { IListOption } from '../../../../../interfaces/ListOption';
import randomizeInputName from '../../../../../util/RandomizeInputName';
import { getLocalizedStringByKey } from '../../../../../util/L10n';

interface IProps {
  name: string,
  directions: Array<IListOption>,
  directionValue: string,
  directionUpdaterFn: (Dispatch<SetStateAction<string>>),
  distanceValue: number | undefined,
  distanceUpdaterFn: (Dispatch<SetStateAction<number | undefined>>),
};

export default function PointOfImpactInput(props: IProps) {
  const selectName = randomizeInputName('offsetDirectSelect');

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    props.directionUpdaterFn(event.currentTarget.value);
  }

  return (
    <>
      <div className="field__cell">
        <RestrictedNumericInput
          adtlClassNames="field__input--cell_width_fix"
          value={ props.distanceValue }
          updaterFn={ props.distanceUpdaterFn }
          name={ props.name }/>
      </div>
      <div className="field__cell">
        <select
          className="field__select field_select--cell_width_fix"
          defaultValue={ props.directionValue }
          id={ selectName }
          name={ selectName }
          onChange={ onSelectChange }>
        {
          props.directions.map((option, index) => {
            return <option 
                key={ index }
                value={ option.value }>
                { getLocalizedStringByKey(option.labelKey) }
              </option>
          })
        }
        </select>
      </div>
    </>
  );
}
