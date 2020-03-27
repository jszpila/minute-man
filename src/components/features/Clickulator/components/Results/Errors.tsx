/**
 * Errors
 * Display form validation error messages
 */

import React, { useContext } from 'react';
import { FeatureContext } from '../../context';

export default function Errors() {
  const context = useContext(FeatureContext);

  return (
    <>
      <h3>Does Not Compute</h3>
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
