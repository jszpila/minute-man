/**
 * Results
 * Display mildot calculator results or errors
 */

import React, { useContext } from 'react';

import { MilDotCalcContenxt } from '../../context';
import Modal from '../../../../Modal';
import { FormattedMessage } from 'react-intl';
import { IValidationError } from '../../validation/Validator';

import '../../../Clickulator/components/Results/results.scss';

export default function ResultsModal() {
  const context = useContext(MilDotCalcContenxt);
  const { errors, isValid, result, shouldShowResultsModal, setShouldShowResultsModal } = context;
  const titleKey = isValid ? 'success' : 'error';
  const icon = isValid ? 'square_foot' : 'error';

  return (
    <Modal
      closeButtonText={ <FormattedMessage id="buttons.ok" />}
      onClose={ setShouldShowResultsModal }
      shouldShow={ shouldShowResultsModal }>
      <h3 className="modal__heading">
        <i className="material-icons modal__heading__icon">{ icon }</i>
        <FormattedMessage id={`mildotcalc.modal.title.${titleKey}`} />
      </h3>
      { isValid ? (
      <p>
        <FormattedMessage id={result?.key} values={{ value: result?.value, unit: result?.unit }} />
      </p>
      ) : ( 
        <ul className="feedback">
          {
            errors.map((error: IValidationError, index: number) => {
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
      )}
    </Modal>
  );
}
