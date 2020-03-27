/**
 * RestrictedNumericInput
 * Allows input of an integer or decimal with the following features:
 * - allows only numbers AND "."
 * - uses number keyboard on mobile
 * - accepts max length AND max value
 * - max of 2 digits before & after decimal - accepts #, #.#, #.##, ##, ##.#, ##.##
 */

import React, { Dispatch, SetStateAction } from 'react';

import { RestrictedNumericInputConfig } from '../features/Clickulator/data/InputConfig';

interface IProps {
  name: string,
  updaterFn: (Dispatch<SetStateAction<number | undefined>>),
  value: number | undefined,
  maxValue?: number,
  maxLength?: number,
};

export default function RestrictedNumericInput(props: IProps) {
  function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    try {
      const tmp = parseFloat(event.currentTarget.value);
      let updateVal = !isNaN(tmp) ? tmp : undefined;
      props.updaterFn(updateVal);
    } catch(error) {
      console.error('Invalid input');
    }
  }

  return (
    <input
      autoComplete="none" // https://stackoverflow.com/questions/15738259/disabling-chrome-autofill
      defaultValue={props.value}
      className="field__input field__input--cell_width_fix"
      maxLength={props.maxLength}
      name={props.name}
      onChange={onChange}
      pattern="^\d+(\.\d{1,2})?$"
      inputMode="numeric"/>
  );
}

RestrictedNumericInput.defaultProps = {
  maxLength: RestrictedNumericInputConfig.maxLength,
  maxValue: RestrictedNumericInputConfig.maxValue
}
