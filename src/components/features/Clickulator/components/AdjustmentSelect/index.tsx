/**
 * OpticAdjustSelect
 * Specifies the MOA-per-click adjustment value of the optic
 */

import React from 'react';

import { getLocalizedStringByKey } from '../../../../../util/L10n';

interface IProps {
  name: string,
  updaterFn: ((value: number) => void),
  value: number,
};

export default function AdjustmentSelect(props: IProps) {
  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    props.updaterFn(Number(event.currentTarget.value));
  }

  const optionLabel = getLocalizedStringByKey('clickulator.adjustmentOptionLabel');

  const options = [
    { value: 0.25, label: `.25 ${ optionLabel }` },
    { value: 0.50, label: `.50 ${ optionLabel }` },
    { value: 1, label: `1 ${ optionLabel }` },
  ];

  return (
    <select
      className="field__select"
      defaultValue={ props.value }
      id={ props.name }
      name={ props.name }
      onChange={ onChange }>
    {
      options.map((option, index) => {
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
