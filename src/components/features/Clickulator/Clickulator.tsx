import React, { SyntheticEvent, useContext } from 'react';
import FeatureWithBottomButtonLayout from '../../layouts/FeatureWithBottomButtonLayout/FeatureWithBottomButtonLayout';
import { OpticAdjustmentIncrements } from '../../../data/OpticAdjustmentIncrements';
import Field from '../../Field/Field';
import RestrictedNumericInput from '../../RestrictedNumericInput/RestrictedNumericInput';
import { FeatureContext } from './context';

import './clickulator.css';

function Clickulator() {
  function onClick(event: SyntheticEvent): void {
    event.preventDefault();
    console.log('YO WADDUP')
  }

  const featureContext = useContext(FeatureContext);
  const vertLabel = <>Vertical Offset <i className="field__label__hint">(inches)</i></>;
  const horizLabel = <>Horizontal Offset <i className="field__label__hint">(inches)</i></>;
 
  const fieldSet =
    // TODO: make components w/ update handlers
    // - zero distance
    // - optic adjustment increment
    // - Modal
    // - field set
    <fieldset className="form__fieldset">
      {/* <legend className="txt__heading-2">Clickulator</legend> */}
      <Field
        inputName="horizontalOffsetDistance"
        labelText={horizLabel}>
        <RestrictedNumericInput
          name="horizontalOffsetDistance"
          value={featureContext.horizontalOffsetDistance}/>
      </Field>
      <Field
        inputName="verticalOffsetDistance"
        labelText={vertLabel}>
        <RestrictedNumericInput
          name="verticalOffsetDistance"
          value={featureContext.verticalOffsetDistance}/>
      </Field>
      <Field
        inputName="zeroAtDistance"
        labelText="Zero Distance">
          <input
            className="field__input"
            name="zeroAtDistance"
            type="number"
            min="25"
            max="500"
            step="25"
            value={featureContext.zeroAtDistance}/>
      </Field>
      <Field
        inputName="opticAdjustmentIncrement"
        labelText="Optic Increment">
          <select
            className="field__select"
            defaultValue={featureContext.opticAdjustmentIncrement}
            name="opticAdjustmentIncrement">
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
        </Field>
    </fieldset>;

  const button =
    <button
      className="button button--primary button--yuge"
      onClick={onClick}
      type="button">clickulate!</button>;
  
  return (
    <form className="form clickulator">
        <FeatureWithBottomButtonLayout
          content={fieldSet}
          button={button}
        />
    </form>
  );
}

export default Clickulator;
