import React, { useContext, SyntheticEvent } from 'react';
import { AppContext } from '../../context/AppContext';

function InfoButton() {
  const context = useContext(AppContext);

  function onClick(event: SyntheticEvent): void {
    event.preventDefault();
    context.updateShouldShowInfoModal(!context.shouldShowInfoModal);
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

export default InfoButton;
