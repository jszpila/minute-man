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
      className="button button--inverted button--round"
      type="button"
      onClick={onClick}>
        ?
      </button>
  );
}

export default InfoButton;
