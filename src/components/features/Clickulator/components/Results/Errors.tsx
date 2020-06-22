/**
 * Errors
 * Display form validation error messages
 */

import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { ClickulatorContext } from '../../context';
import { IValidationError } from '../../validation/Validator';

export default function Errors() {
  const context = useContext(ClickulatorContext);

  return (
    <>
      <h3 className="modal__heading">
        <i className="material-icons modal__heading__icon">error</i>
        <FormattedMessage id="clickulator.modal.title.error" />
      </h3>
      <ul className="feedback">
        { 
          context.errors.map((error: IValidationError, index: number) => {
            return <li 
              className="feedback__item" 
              key={ index }>
                <FormattedMessage
                  id={ error.localeStringKey }
                  values={ error.values } />
              </li>
          })
        }
      </ul>
    </>
  );
}
