/**
 * PointOfImpactInput
 * Specify distance and direction deltas between actual and desired points-of-impact
 */

import React, { Dispatch, SetStateAction } from 'react';
import RestrictedNumericInput from '../../../../RestrictedNumericInput';
import { IListOption } from '../../../../../interfaces/ListOption';

interface IProps {
  name: string,
  directions: Array<IListOption>,
  directionValue: string,
  directionUpdaterFn: (Dispatch<SetStateAction<string>>),
  distanceValue: number | undefined,
  distanceUpdaterFn: (Dispatch<SetStateAction<number | undefined>>),
};

export default function PointOfImpactInput(props: IProps) {
  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    props.directionUpdaterFn(event.currentTarget.value);
  }

  return (
    <>
      <div className="field__cell">
        <RestrictedNumericInput
          value={props.distanceValue}
          updaterFn={props.distanceUpdaterFn}
          name={props.name}/>
      </div>
      <div className="field__cell">
        <select
          className="field__select field_select--cell_width_fix"
          defaultValue={props.directionValue}
          onChange={onSelectChange}>
        {
          props.directions.map((option, index) => {
            return <option 
                key={index}
                value={option.value}>
                {option.label}
              </option>
          })
        }
        </select>
      </div>
    </>
  );
}