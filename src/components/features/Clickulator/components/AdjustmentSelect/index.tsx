/**
 * OpticAdjustSelect
 * Specifies the MOA-per-click adjustment value of the optic
 */

import React from 'react';

import { AdjustmentIncrements } from '../../data/AdjustmentIncrements';

interface IProps {
  name: string,
  updaterFn: ((value: number) => void),
  value: number,
};

export default function AdjustmentSelect(props: IProps) {
  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    props.updaterFn(Number(event.currentTarget.value));
  }

  return (
    <select
      className="field__select"
      defaultValue={ props.value }
      name={ props.name }
      onChange={ onChange }>
    {
      AdjustmentIncrements.map((option, index) => {
        return <option 
            key={ index }
            value={ option.value }>
            { option.label }
          </option>
      })
    }
    </select>
  );
}
