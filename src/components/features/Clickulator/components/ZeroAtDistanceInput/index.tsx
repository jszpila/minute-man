/**
 * ZeroAtDistanceInput
 * Specifies the distance for which the optic should be calibrated  
 */

import React, { Dispatch, SetStateAction } from 'react';

import { ZeroAtDistanceConfig } from '../../data/InputConfig';

interface IProps {
  updaterFn: (Dispatch<SetStateAction<number>>),
  value: number,
};

export default function ZeroAtDistanceInput(props: IProps) {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.validity.valid) {
      props.updaterFn(Number(event.currentTarget.value));
    }
  }

  return (
    <input
      className="field__input"
      min={ZeroAtDistanceConfig.min}
      max={ZeroAtDistanceConfig.max}
      name="zeroAtDistance"
      onChange={onChange}
      step={ZeroAtDistanceConfig.step}
      type="number"
      defaultValue={props.value}/>
  );
}
