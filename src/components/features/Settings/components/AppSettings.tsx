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
import SettingsStore from '../SettingsStore';
import { AppDefaultValues } from '../../../../data/AppDefaults';
import Field from '../../../Field/Field';
import applyLocaleLang from '../../../../util/applyLocaleLang';

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
    const themeToApply = isChecked ? darkThemeClassName : defaults.theme;

    context.setTheme(themeToApply);
    settings.app.theme = themeToApply;

    root.classList.toggle(defaults.theme, themeToApply === defaults.theme);
    root.classList.toggle(darkThemeClassName, themeToApply === darkThemeClassName);
  }

  function onLocaleChange(event: ChangeEvent<HTMLSelectElement>): void {
    const prevLocale = settings.app.locale
    const newLocale = event.currentTarget.value;

    context.setLocale(newLocale);
    settings.app.locale = newLocale;

    root.classList.replace(`locale-${ prevLocale }`, `locale-${ newLocale }`);
    applyLocaleLang();
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
        inputName="language"
        labelText="Language">
        <select
          className="field__select"
          defaultValue={ settings.app.locale }
          id="locale"
          name="locale"
          onChange={ onLocaleChange }>
            <option value="en-US">English/US</option>
            <option value="es-MX">Española/Mexico</option>
            <option value="pl-PL">Polskie/Polska</option>
        </select>
      </Field>
    </fieldset>
  );
}
