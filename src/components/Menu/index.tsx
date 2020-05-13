import { Link } from '@reach/router';
import React, { SyntheticEvent, useContext } from 'react';
import ReactDOM from 'react-dom';

import { AppContext } from '../../context/AppContext';
import INavigationItem from '../../interfaces/NavigationItem';
import buildConditionalClasses from '../../util/BuildConditionalClasses';
import GitInfo from '../../static/GitInfo';

import './menu.scss';

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
          className: `app-menu__list__item__link ${ buildConditionalClasses(isCurrent, 'app-menu__list__item__link--active') }`
        };
      }}
    />
  )
}

function MenuItem(props: IMenuItemProps) {
  const type = props.type || MenuItemType.Link;
  const child = type === MenuItemType.Link ? <MenuLink { ...props } /> : <MenuButton { ...props } />;

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
      <i className="material-icons app-menu__list__item__icon">{ props.iconName }</i>
      <span className="app-menu__list__item__label">{ props.text }</span>
    </button>
  )
}

function MenuLink(props: IMenuItemProps) {
  const adtlProps = { 
    onClick: props.onClick || undefined,
  };

  return (
    <NavLink
      { ...adtlProps }
      to={ props.route }>
        <i className="material-icons app-menu__list__item__icon">{ props.iconName }</i>
        <span className="app-menu__list__item__label">{ props.text }</span>
      </NavLink>
  )
}

interface IMenuProps {
  navItems: Array<INavigationItem>,
}

export default function Menu(props: IMenuProps) {
  const context = useContext(AppContext);
  const env = process.env;

  function onMenuCoverClick(event: SyntheticEvent): void {
    context.setShouldShowMenu(false);
  }

  function onInfoClick(event: SyntheticEvent): void {
    context.setShouldShowInfoModal(!context.shouldShowInfoModal);
  }

  function closeMenu(event: SyntheticEvent): void {
    context.setShouldShowMenu(false);
  }

  return ReactDOM.createPortal(
    <>
      <div
        className={ `app-menu__cover ${ buildConditionalClasses(context.shouldShowMenu, 'app-menu__cover--active') }` }
        onClick={ onMenuCoverClick }>
      </div>
      <nav
        className={ `app-menu ${ buildConditionalClasses(!context.shouldShowMenu, 'app-menu--closed') }` }>
        <ul className="app-menu__list">
          {
            props.navItems.map((item, index) => {
              return <MenuItem
                key={ index }
                iconName={ item.icon }
                onClick={ closeMenu }
                route={ item.route }
                text={ item.displayName } />
            })
          }
        </ul>
        <hr className="app-menu__list-divider" />
        <ul className="app-menu__list">
          <MenuItem
              iconName="info"
              onClick={ onInfoClick }
              text="Info"
              type={ MenuItemType.Button } />
        </ul>
        <div className="app-menu__version">
          v{ env.REACT_APP_VERSION }
        </div>
      </nav>
    </>,
    document.body,
  );
}
