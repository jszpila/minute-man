/**
 * Corrections
 * Display calibration instructions
 */

import React, { useContext } from 'react';
import { FeatureContext } from '../../context';

export default function Corrections() {
  const context = useContext(FeatureContext);

  return (
    <>
      <h3 className="modal__heading">
        <i className="material-icons modal__heading__icon">check_circle</i>
        Click It</h3>
      <ul className="feedback">
        { 
          context.corrections.map((correction: string, index: number) => {
            return <li
              className="feedback__item"
              key={index}>
                {correction}
              </li>
          })
        }
      </ul>
    </>
  );
}
