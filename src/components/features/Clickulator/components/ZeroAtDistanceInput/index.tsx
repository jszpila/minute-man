/**
 * ZeroAtDistanceInput
 * Specifies the distance for which the optic should be calibrated
 */

import React from "react";

import { ZeroAtDistanceConfig } from "../../data/InputConfig";

interface IProps {
  name: string;
  updaterFn: (value: number) => void;
  value: number;
}

export default function ZeroAtDistanceInput(props: IProps) {
  function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.target.validity.valid) {
      props.updaterFn(Number(event.currentTarget.value));
    }
  }

  return (
    <input
      className="field__input"
      id={props.name}
      min={ZeroAtDistanceConfig.min}
      max={ZeroAtDistanceConfig.max}
      name={props.name}
      onChange={onChange}
      step={ZeroAtDistanceConfig.step}
      type="number"
      defaultValue={props.value}
    />
  );
}
