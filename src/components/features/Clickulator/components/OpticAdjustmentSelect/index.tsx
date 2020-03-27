/**
 * OpticAdjustSelect
 * Specifies the MOA-per-click adjustment value of the optic
 */

import React, { Dispatch, SetStateAction } from 'react';
import { OpticAdjustmentIncrements } from '../../data/OpticAdjustmentIncrements';

interface IProps {
  updaterFn: (Dispatch<SetStateAction<number>>),
  value: number,
};

export default function OpticAdjustmentSelect(props: IProps) {
  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    props.updaterFn(Number(event.currentTarget.value));
  }

  return (
    <select
      className="field__select"
      defaultValue={props.value}
      name="opticAdjustmentIncrement"
      onChange={onChange}>
    {
      OpticAdjustmentIncrements.map((option, index) => {
        return <option 
            key={index}
            value={option.value}>
            {option.label}
          </option>
      })
    }
    </select>
  );
}
