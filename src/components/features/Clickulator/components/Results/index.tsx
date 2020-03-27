/**
 * Results
 * Display corrective instructions or errors w/ guidance as necessary
 */

import React, { useContext } from 'react';

import { FeatureContext } from '../../context';
import Corrections from './Corrections';
import Errors from './Errors';
import Modal from '../../../../Modal';

import './results.css';

export default function Results() {
  const context = useContext(FeatureContext);

  return (
    <Modal>
      { context.isValid
        ? <Corrections />
        : <Errors />
      }
    </Modal>
  );
}
