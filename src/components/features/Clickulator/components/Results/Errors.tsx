/**
 * Errors
 * Display form validation error messages
 */

import React, { useContext } from 'react';
import { ClickulatorContext } from '../../context';

export default function Errors() {
  const context = useContext(ClickulatorContext);

  return (
    <>
      <h3 className="modal__heading">
        <i className="material-icons modal__heading__icon">error</i>
        Does Not Compute</h3>
      <ul className="feedback">
        { 
          context.errors.map((error: string, index: number) => {
            return <li 
              className="feedback__item" 
              key={index}>
                {error}
              </li>
          })
        }
      </ul>
    </>
  );
}
