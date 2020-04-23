import React, { SyntheticEvent, useContext } from 'react';

import { AppContext } from '../../context/AppContext';

export default function InfoButton() {
  const context = useContext(AppContext);

  function onClick(event: SyntheticEvent): void {
    event.preventDefault();
    context.setShouldShowInfoModal(!context.shouldShowInfoModal);
  }

  return (
    <button
      className="app-bar__button"
      type="button"
      onClick={onClick}>
        <i className="material-icons">info</i>
      </button>
  );
}
