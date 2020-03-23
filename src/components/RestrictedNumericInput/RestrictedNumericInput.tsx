import React from 'react';

interface IProps {
  name: string,
  value: number,
  maxValue?: number,
  maxLength?: number,
};

function RestrictedNumericInput(props: IProps) {
  function onInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.currentTarget.value);
    const isValid = event.target.validity.valid;

    if (isValid
        && (props.maxValue
          && (value <= props.maxValue))) {
      // do the thing
    }
  }

  return (
    <input
      className="field__input"
      maxLength={props.maxLength}
      name={props.name}
      onInput={onInput}
      pattern="^\d+(\.\d{1,2})?$"
      inputMode="numeric"
      value={props.value}/>
  );
}

RestrictedNumericInput.defaultProps = {
  maxLength: 5,
  maxValue: 99.99,
}

export default RestrictedNumericInput;


// RestrictedNumericInput:
// - allows only numbers AND "."
// - preferably uses number keyboard on mobile
// - accepts max length AND max value
// - max of 2 digits before & after decimal - accepts #, #.#, ##.#, ##.##