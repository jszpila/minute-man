import React, { SyntheticEvent, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Link } from '@reach/router';
import { AppContext } from '../../context/AppContext';

import './menu.css';
import { TimertronRoute } from '../features/Timertron/Timertron';
import { ClickulatorRoute } from '../features/Clickulator/Clickulator';
import BuildConditionalClasses from '../../util/BuildConditionalClasses';

type TMenuItem = 'button' | 'link';

enum MenuItemType {
  Button = 'button',
  Link = 'link'
}

interface IMenuItemProps {
  iconName: string,
  text: string,
  onClick?: (event: SyntheticEvent) => void,
  route?: string,
  type?: TMenuItem,
}

// TODO: make less ugly
// adapted from https://reach.tech/router/example/active-links
function NavLink(props: any) {
  return(
    <Link {...props}
      getProps={({ isCurrent }) => {
        return {
          className: `app-menu__list__item__link ${ BuildConditionalClasses(isCurrent, 'app-menu__list__item__link--active') }`
        };
      }}
    />
  )
}

function MenuItem(props: IMenuItemProps) {
  const type = props.type || MenuItemType.Link;
  const child = type === MenuItemType.Link ? <MenuLink {...props } /> : <MenuButton { ...props } />;

  return(
    <li className="app-menu__list__item">
      { child }
    </li>
  );
}

function MenuButton(props: IMenuItemProps) {
  return (
    <button
      className="app-menu__list__item__button"
      onClick={ props.onClick }
      type="button">
      <i className="material-icons">{ props.iconName }</i>
      <span className="app-menu__list__item__label">{ props.text }</span>
    </button>
  )
}

function MenuLink(props: IMenuItemProps) {
  let adtlProps = { 
    onClick: props.onClick || undefined,
  };

  return (
    <NavLink
      { ...adtlProps }
      to={ props.route }>
        <i className="material-icons">{ props.iconName }</i>
        <span className="app-menu__list__item__label">{ props.text }</span>
      </NavLink>
  )
}

export default function Menu() {
  const context = useContext(AppContext);

  function onMenuCoverClick(event: SyntheticEvent): void {
    context.updateShouldShowMenu(false);
  }

  function onInfoClick(event: SyntheticEvent): void {
    context.updateShouldShowInfoModal(!context.shouldShowInfoModal);
  }

  function closeMenu(event: SyntheticEvent): void {
    context.updateShouldShowMenu(false);
  }

  return ReactDOM.createPortal(
    <>
      <div
        className={ `app-menu__cover ${ BuildConditionalClasses(context.shouldShowMenu, 'app-menu__cover--active') }` }
        onClick={ onMenuCoverClick }>
      </div>
      <nav
        className={ `app-menu ${ BuildConditionalClasses(context.shouldShowMenu, 'app-menu--active') }` }>
        <ul className="app-menu__list">
          <MenuItem
            iconName="adjust"
            onClick={ closeMenu }
            route={ ClickulatorRoute }
            text="Zero Tool" />
          <MenuItem
            iconName="timer"
            onClick={ closeMenu }
            route={ TimertronRoute }
            text="Shot Timer" />
          <MenuItem
            iconName="info"
            onClick={ onInfoClick }
            text="Info"
            type={ MenuItemType.Button } />
        </ul>
      </nav>
    </>,
    document.body,
  );
}
