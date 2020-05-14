/**
 *                    
 * Settings
 *                                                                 
 * App level settings
 *
 */

import { RouteComponentProps } from '@reach/router';
import React, { ChangeEvent, useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { AppContext } from '../../../../context/AppContext';
import { AppDefaultValues } from '../../../../data/AppDefaults';
import { applyLocaleLang } from '../../../../util/L10n';
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
            <option value="en">English</option>
            <option value="es">Española</option>
            <option value="pl">Polskie</option>
        </select>
      </Field>
    </fieldset>
  );
}
