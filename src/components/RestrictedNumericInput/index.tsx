/**
 * RestrictedNumericInput
 * Allows input of an integer or decimal with the following features:
 * - allows only numbers AND "."
 * - uses number keyboard on mobile
 * - accepts max length AND max value
 * - max of 2 digits before & after decimal - accepts #, #.#, #.##, ##, ##.#, ##.##
 */

import React, { Dispatch, SetStateAction } from "react";

import { RestrictedNumericInputConfig } from "../features/Clickulator/data/InputConfig";

interface IProps {
  updaterFn: Dispatch<SetStateAction<number | undefined>>;
  value: number | undefined;
  labelledBy?: string | undefined;
  maxValue?: number;
  maxLength?: number;
  name?: string;
  placeholder?: string | undefined;
}

export default function RestrictedNumericInput(
  props: IProps & React.HTMLAttributes<HTMLDivElement>
) {
  const labelledBy = `${props.labelledBy ? props.labelledBy : props.name}Label`;

  function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    try {
      const tmp = parseFloat(event.currentTarget.value);
      const updateVal = !isNaN(tmp) ? tmp : undefined;
      props.updaterFn(updateVal);
    } catch (error) {
      console.error("Invalid input");
    }
  }

  return (
    <input
      autoComplete="none"
      aria-labelledby={labelledBy}
      className={`field__input field__numeric`}
      defaultValue={props.value}
      id={props.name}
      inputMode="numeric"
      maxLength={props.maxLength}
      name={props.name}
      onChange={onChange}
      pattern="^\d+(\.\d{1,2})?$"
      placeholder={props.placeholder}
    />
  );
}

RestrictedNumericInput.defaultProps = {
  labelledBy: undefined,
  maxLength: RestrictedNumericInputConfig.maxLength,
  maxValue: RestrictedNumericInputConfig.maxValue,
  name: "",
  placeholder: RestrictedNumericInputConfig.placeholder,
};
