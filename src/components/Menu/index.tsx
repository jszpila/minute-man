import React, { SyntheticEvent, useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { AppContext } from '../../context/AppContext';

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
        onClick={ props.onClick }
        type="button">
        <i className="material-icons"> { props.iconName }</i>
        <span className="app-menu__list__item__label">{ props.text }</span>
        </button>
    </li>
  );
}

export default function Menu() {
  const context = useContext(AppContext);
  const ref = useRef<HTMLElement>(null);

  function onMenuCoverClick(event: SyntheticEvent): void {
    context.updateShouldShowMenu(false);
  }

  function appendConditionalClasses(condition: boolean, adtlClassNames: string): string {
    return condition ? adtlClassNames : '';
  }

  function onInfoClick(event: SyntheticEvent): void {
    context.updateShouldShowInfoModal(!context.shouldShowInfoModal);
  }

  function onClickPlaceholder(event: SyntheticEvent): void {
    console.log('clicked');
  }

  return ReactDOM.createPortal(
    <>
      <div
        className={ `app-menu__cover ${ appendConditionalClasses(context.shouldShowMenu, 'app-menu__cover--active') }` }
        onClick={ onMenuCoverClick }>
      </div>
      <nav
        className={ `app-menu ${ appendConditionalClasses(context.shouldShowMenu, 'app-menu--active') }` }
        ref={ ref } >
        <ul className="app-menu__list">
          <MenuItem
            iconName="adjust"
            onClick={ onClickPlaceholder }
            text="Zero Tool" />
          <MenuItem
            iconName="timer"
            onClick={ onClickPlaceholder }
            text="Shot Timer" />
          <MenuItem
            iconName="info"
            onClick={ onInfoClick }
            text="Info" />
        </ul>
      </nav>
    </>,
    document.body,
  );
}
