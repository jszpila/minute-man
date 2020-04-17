/**
 * ResetButton
 * Resets Timertron state
 */

import React, { SyntheticEvent } from 'react';

interface IProps {
  onClick: (event: SyntheticEvent) => void,
}

export default function ResetButton(props: IProps) {
  return (
    <button 
      type="button" 
      className={`button button--danger button--yuge button--flex-1`} 
      onClick={ props.onClick }>Reset</button>
  );
}
