/**
 * FieldSet
 * Presentational component for inputs
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import { getLocalizedDistanceUnit, getLocalizedOffsetUnit } from '../../../../../util/L10n';
import randomizeInputName from '../../../../../util/RandomizeInputName';
import Field, { LabelElementType } from '../../../../Field/Field';
import RestrictedNumericInput from '../../../../RestrictedNumericInput';
import { MilDotCalcContenxt } from '../../context';
import MilDotCalcDefaultValues from '../../data/Defaults';

export default function FieldSet() {
  const distanceUnit = getLocalizedDistanceUnit();
  const offsetUnit = getLocalizedOffsetUnit();
  const milSizeLabelId = "mildotcalc.milSize"
  const physicalSizeLabelId = "mildotcalc.physicalSize"
  const distanceLabelId = "mildotcalc.distance"
  const defaults = MilDotCalcDefaultValues;

  // TODO: make IconLabel component
  const milSizeLabel = <>
    <FormattedMessage id={ milSizeLabelId } /> 
    <i className="field__label__hint txt--smaller txt--muted">(<FormattedMessage id="units.mil" />)</i></>;
  
  const targePhysicalSizeLabel = <>
    <FormattedMessage id={ physicalSizeLabelId } /> 
    <i className="field__label__hint txt--smaller txt--muted">({ offsetUnit })</i></>;

  const distanceLabel = <>
    <FormattedMessage id={ distanceLabelId } /> 
    <i className="field__label__hint txt--smaller txt--muted">({ distanceUnit })</i></>;

  // TODO: bake randomizeInputNames into Field?
  const inputNames = {
    milSize: randomizeInputName('milSize'),
    physicalSize: randomizeInputName('physicalSize'),
    distance: randomizeInputName('distance'),
  }
  
  return (
    <MilDotCalcContenxt.Consumer>
      {value =>
        <fieldset className="form__fieldset">
          {/* TODO: Callout component */}
          <div className="b-callout">
            <i className="material-icons b-callout__icon">info</i>
            <p className="b-callout__blurb">
              <FormattedMessage id="mildotcalc.blurb" />
            </p>
          </div>
          <Field
            inputName={ inputNames.milSize }
            labelText={ milSizeLabel }
            labelElementType={ LabelElementType.Span }>
            <RestrictedNumericInput 
              labelledBy={ milSizeLabelId }
              name={ inputNames.milSize }
              value={ defaults.milSize }
              updaterFn={ value.setMilSize } />
          </Field>
          <Field
            inputName={ inputNames.physicalSize }
            labelText={ targePhysicalSizeLabel }
            labelElementType={ LabelElementType.Span }>
            <RestrictedNumericInput 
              labelledBy={ physicalSizeLabelId }
              name={ inputNames.physicalSize }
              value={ defaults.physicalSize }
              updaterFn={ value.setPhysicalSize } />
          </Field>
          <Field
            inputName={ inputNames.distance }
            labelText={ distanceLabel }
            labelElementType={ LabelElementType.Span }>
            <RestrictedNumericInput 
              labelledBy={ distanceLabelId }
              name={ inputNames.distance }
              value={ defaults.distance }
              updaterFn={ value.setDistance } />
          </Field>
        </fieldset>
      }
    </MilDotCalcContenxt.Consumer>
  );
}
