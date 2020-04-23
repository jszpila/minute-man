/**
 *                    
 * Settings
 *                                                                 
 * App level settings
 *
 */

import { RouteComponentProps } from '@reach/router';
import React, { ChangeEvent, useContext } from 'react';

import INavigationItem from '../../../interfaces/NavigationItem';
import Field from '../../Field/Field';
import { AppContext } from '../../../context/AppContext';
import { AppDefaultValues } from '../../../data/AppDefaults';

import './settings.css';

export const ThemeKey = 'theme';

export const SettingsNavConfig: INavigationItem = {
  route: '/settings',
  icon: 'settings',
  displayName: 'Settings',
};

export default function Settings(props: RouteComponentProps) {
  const context = useContext(AppContext);
  const root = document.documentElement;
  const darkThemeClassName = 'theme-dark';
  const checkboxIcon = context.theme === darkThemeClassName ? 'check_box' : 'check_box_outline_blank';

  function isDarkThemeChecked(): boolean {
    return context.theme === darkThemeClassName;
  }

  function onThemeChange(event: ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    const themeToApply = isChecked ? darkThemeClassName : AppDefaultValues.theme;

    context.setTheme(themeToApply);
    localStorage.setItem(ThemeKey, themeToApply);

    root.classList.toggle(AppDefaultValues.theme, themeToApply === AppDefaultValues.theme);
    root.classList.toggle(darkThemeClassName, themeToApply === darkThemeClassName);
  }

  return (
    <form
      id="Settings"
      className="form">
      <fieldset>
        <Field
          inputName="theme"
          labelText="Dark Mode">
          <>
            <label>
              <i className="material-icons"> { checkboxIcon } </i>
              <input
                className="field__checkbox"
                defaultChecked={ isDarkThemeChecked() }
                name="theme"
                onChange={ onThemeChange }
                type="checkbox" />
            </label>
          </>
        </Field>
      </fieldset>
    </form>
  );
}
