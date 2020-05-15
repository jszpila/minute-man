/**
 *                    
 * Settings
 *                                                                 
 * App level settings
 *
 */

import { RouteComponentProps } from '@reach/router';
import React, { ChangeEvent, useContext } from 'react';

import { AppContext } from '../../../../context/AppContext';
import { AppDefaultValues } from '../../../../data/AppDefaults';
import Field from '../../../Field/Field';
import SettingsStore from '../SettingsStore';

export default function AppSettings(props: RouteComponentProps) {
  const context = useContext(AppContext);

  const root = document.documentElement;
  const darkThemeClassName = 'theme-dark';
  const checkboxIcon = context.theme === darkThemeClassName ? 'check_box' : 'check_box_outline_blank';
  const settings = SettingsStore.getInstance();
  const defaults = AppDefaultValues;

  function isDarkThemeChecked(): boolean {
    return context.theme === darkThemeClassName;
  }

  function onThemeChange(event: ChangeEvent<HTMLInputElement>): void {
    const isChecked = event.target.checked;
    const prevTheme = settings.app.theme;
    const newTheme = isChecked ? darkThemeClassName : defaults.theme;

    context.setTheme(newTheme);
    settings.app.theme = newTheme;

    root.classList.replace(prevTheme, newTheme);
  }

  function onFontSizeChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const prevFontSize = settings.app.fontSize;
    const newFontSize = event.currentTarget.value;

    context.setFontSize(newFontSize);
    settings.app.fontSize = newFontSize;

    root.classList.replace(prevFontSize, newFontSize);
  }

  return (
    <fieldset className="form__fieldset">
      <legend className="form__fieldset__legend">App Settings</legend>
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
      <Field
        inputName="fontSize"
        labelText="Font Size">
        <select
          className="field__select"
          defaultValue={ settings.app.fontSize }
          id="fontSize"
          name="fontSize"
          onChange={ onFontSizeChange }>
            <option value="font-size-xs">Microscopic</option>
            <option value="font-size-s">Diminutive</option>
            <option value="font-size-m">Normie</option>
            <option value="font-size-l">Embiggened</option>
            <option value="font-size-xl">THICCC</option>
          </select>
      </Field>
    </fieldset>
  );
}
