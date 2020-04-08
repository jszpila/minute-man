import React, { useContext, SyntheticEvent } from 'react';
import { AppContext } from '../../context/AppContext';
import ReactDOM from 'react-dom';

import './menu.css';

export default function Menu() {
  const context = useContext(AppContext);

  function getStatefulClassNames(): string {
    return context.shouldShowMenu ? 'app-menu app-menu--active' : 'app-menu';
  }

  function onInfoClick(event: SyntheticEvent): void {
    context.updateShouldShowInfoModal(!context.shouldShowInfoModal);
  }

  return ReactDOM.createPortal(
    <nav className={ getStatefulClassNames() }>
      <ul className="app-menu__list">
        <li className="app-menu__list__item">
          <button
            className="app-menu__list__item__button"
            type="button">
            <i className="material-icons">adjust</i>
            <span className="app-menu__list__item__label">Clickulator</span>
            </button>
        </li>
        <li className="app-menu__list__item">
          <button
            className="app-menu__list__item__button"
            type="button">
            <i className="material-icons">timer</i>
            <span className="app-menu__list__item__label">Shot Timer</span>
          </button>
        </li>
        <li className="app-menu__list__item">
          <button 
            className="app-menu__list__item__button"
            type="button"
            onClick={onInfoClick}>
            <i className="material-icons">info</i>
            <span className="app-menu__list__item__label">Info</span>
          </button>
        </li>
      </ul>
    </nav>,
    document.body,
  );
}
