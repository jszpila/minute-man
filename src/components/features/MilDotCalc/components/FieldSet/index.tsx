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

  const milSizeLabel = <>
    <FormattedMessage id={ milSizeLabelId } /> 
    <i className="field__label__hint txt--smaller txt--muted">(<FormattedMessage id="units.mil" />)</i></>;
  
  const targePhysicalSizeLabel = <>
    <FormattedMessage id={ physicalSizeLabelId } /> 
    <i className="field__label__hint txt--smaller txt--muted">({ offsetUnit })</i></>;

  const distanceLabel = <>
    <FormattedMessage id={ distanceLabelId } /> 
    <i className="field__label__hint txt--smaller txt--muted">({ distanceUnit })</i></>;

  const inputNames = {
    milSize: randomizeInputName('milSize'),
    physicalSize: randomizeInputName('physicalSize'),
    distance: randomizeInputName('distance'),
  }

  return (
    <MilDotCalcContenxt.Consumer>
      {value =>
        <fieldset className="form__fieldset">
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
              name="milSize"
              value={ defaults.milSize }
              updaterFn={ value.setMilSize } />
          </Field>
          <Field
            inputName={ inputNames.physicalSize }
            labelText={ targePhysicalSizeLabel }
            labelElementType={ LabelElementType.Span }>
            <RestrictedNumericInput 
              labelledBy={ physicalSizeLabelId }
              name="physicalSize"
              value={ defaults.physicalSize }
              updaterFn={ value.setPhysicalSize } />
          </Field>
          <Field
            inputName={ inputNames.distance }
            labelText={ distanceLabel }
            labelElementType={ LabelElementType.Span }>
            <RestrictedNumericInput 
              labelledBy={ distanceLabelId }
              name="targetDisance"
              value={ defaults.distance }
              updaterFn={ value.setDistance } />
          </Field>
        </fieldset>
      }
    </MilDotCalcContenxt.Consumer>
  );
}
