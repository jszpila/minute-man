/**
 * Results
 * Display corrective instructions or errors w/ guidance as necessary
 */

import React, { useContext } from 'react';

import { ClickulatorContext } from '../../context';
import Corrections from './Corrections';
import Errors from './Errors';
import Modal from '../../../../Modal';

import './results.scss';

export default function ResultsModal() {
  const context = useContext(ClickulatorContext);
  const shouldShow = context.shouldShowResultsModal;

  return (
    <Modal
      closeButtonText={'OK Boomer'}
      onClose={ context.setShouldShowResultsModal }
      shouldShow={ shouldShow }>
      { context.isValid ? 
          <Corrections /> 
        : 
          <Errors /> 
      }
    </Modal>
  );
}
