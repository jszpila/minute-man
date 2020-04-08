import React, { useContext, SyntheticEvent } from 'react';
import { AppContext } from '../../context/AppContext';
import ReactDOM from 'react-dom';

import './menu.css';

interface IMenuItemProps {
  iconName: string,
  onClick: (event: SyntheticEvent) => void,
  text: string,
}

function MenuItem(props: IMenuItemProps) {
  return(
    <li className="app-menu__list__item">
      <button
        className="app-menu__list__item__button"
        onClick={props.onClick}
        type="button">
        <i className="material-icons">{props.iconName}</i>
        <span className="app-menu__list__item__label">{props.text}</span>
        </button>
    </li>
  );
}

export default function Menu() {
  const context = useContext(AppContext);

  function getStatefulClassNames(): string {
    return context.shouldShowMenu ? 'app-menu app-menu--active' : 'app-menu';
  }

  function onInfoClick(event: SyntheticEvent): void {
    context.updateShouldShowInfoModal(!context.shouldShowInfoModal);
  }

  function onClickPlaceholder(event: SyntheticEvent): void {
    console.log('clicked');
  }

  return ReactDOM.createPortal(
    <nav className={ getStatefulClassNames() }>
      <ul className="app-menu__list">
        <MenuItem
          iconName="adjust"
          onClick={ onClickPlaceholder }
          text="Clickulator" />
        <MenuItem
          iconName="timer"
          onClick={ onClickPlaceholder }
          text="Shot Timer" />
        <MenuItem
          iconName="info"
          onClick={ onInfoClick }
          text="Info" />
      </ul>
    </nav>,
    document.body,
  );
}
