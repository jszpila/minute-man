import React, { SyntheticEvent, useContext } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { AppContext } from "../../context/AppContext";
import INavigationItem from "../../interfaces/NavigationItem";
import { getLocalizedStringByKey } from "../../util/L10n";
import { NavLink } from "react-router-dom";

import "./menu.scss";
interface IMenuLinkItemProps {
  iconName: string;
  localizedTitleKey: string;
  route: string;
  onClick?: (event: SyntheticEvent) => void | undefined;
}
interface IMenuButtonItemProps {
  iconName: string;
  localizedTitleKey: string;
  onClick: (event: SyntheticEvent) => void;
}

function MenuButton(props: IMenuButtonItemProps) {
  return (
    <button
      className="app-menu__list__item__button"
      onClick={props.onClick}
      type="button"
    >
      <i className="material-icons app-menu__list__item__icon">
        {props.iconName}
      </i>
      <span className="app-menu__list__item__label">
        {getLocalizedStringByKey(props.localizedTitleKey)}
      </span>
    </button>
  );
}

function MenuLink(props: IMenuLinkItemProps) {
  const clsName = "app-menu__list__item__link";
  const activeClsName = "app-menu__list__item__link--active";
  const adtlProps = {
    onClick: props.onClick || undefined,
  };


  return (
    <NavLink
      {...adtlProps}
      to={props.route}
      className={({ isActive }) => isActive ? `${clsName} ${activeClsName}` : clsName}
    >
      <i className="material-icons app-menu__list__item__icon">
        {props.iconName}
      </i>
      <span className="app-menu__list__item__label">
        {getLocalizedStringByKey(props.localizedTitleKey)}
      </span>
    </NavLink>
  );
}
interface IMenuProps {
  navItems: Array<INavigationItem>;
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
        className={clsx(
          "app-menu__cover",
          context.shouldShowMenu && "app-menu__cover--active"
        )}
        onClick={onMenuCoverClick}
      ></div>
      <nav
        className={clsx(
          "app-menu",
          !context.shouldShowMenu && "app-menu--closed"
        )}
      >
        <ul className="app-menu__list">
          {props.navItems.map((item, index) => {
            return (
              <li className="app-menu__list__item" key={index}>
                <MenuLink 
                  iconName={item.icon}
                  onClick={closeMenu}
                  route={item.route}
                  localizedTitleKey={item.displayNameKey}
                />
              </li>
            );
          })}
        </ul>
        <hr className="app-menu__list-divider" />
        <ul className="app-menu__list">
          <MenuButton
            iconName="info"
            onClick={onInfoClick}
            localizedTitleKey="info.title"
          />
          <li>
            <a
              className="app-menu__list__item__link"
              href="https://szpi.la/l/mmcoffee"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="material-icons app-menu__list__item__icon">
                attach_money
              </i>
              <span className="app-menu__list__item__label">Donate</span>
            </a>
          </li>
        </ul>
        <div className="app-menu__version txt--smaller txt--muted">
          <a
            href="https://github.com/jszpila/minute-man/blob/master/README.md"
            rel="noopener noreferrer"
            target="_blank"
          >
            v{env.REACT_APP_VERSION}
          </a>
        </div>
      </nav>
    </>,
    document.body
  );
}
