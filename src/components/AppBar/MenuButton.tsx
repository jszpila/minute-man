import React, { useContext, SyntheticEvent } from 'react';
import { AppContext } from '../../context/AppContext';

export default function MenuButton() {
  const context = useContext(AppContext);

  function onClick(event: SyntheticEvent): void {
    event.preventDefault();
    context.updateShouldShowMenu(!context.shouldShowMenu);
  }

  return (
    <button
      className="app-bar__button"
      type="button"
      onClick={onClick}>
        <i className="material-icons">menu</i>
      </button>
  );
}
