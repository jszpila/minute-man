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
import LocaleStyles from '../../../../data/locale/LocaleStyles';
import FontSizeStyles from '../../../../enum/FontSizeStyles';
import Locales from '../../../../enum/Locales';
import Themes from '../../../../enum/Themes';
import Units from '../../../../enum/Units';
import { applyLocaleLang, getLocalizedStringByKey } from '../../../../util/L10n';
import Field from '../../../Field/Field';
import SettingsStore from '../SettingsStore';

// TODO: flip back when necessary I don't feeel like making feature flags right now
const shouldEnableLocaleSelect = false;

export default function AppSettings(props: RouteComponentProps) {
  const context = useContext(AppContext);

  const root = document.documentElement;
  const checkboxIcon = context.theme === Themes.Dark ? 'check_box' : 'check_box_outline_blank';
  const settings = SettingsStore.getInstance();

  function isDarkThemeChecked(): boolean {
    return context.theme === Themes.Dark;
  }

  function onThemeChange(event: ChangeEvent<HTMLInputElement>): void {
    const isChecked = event.target.checked;
    const prevTheme = settings.app.theme;
    const newTheme = isChecked ? Themes.Dark : Themes.Default;

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

  function onLocaleChange(event: ChangeEvent<HTMLSelectElement>): void {
    const prevLocale = settings.app.locale
    const newLocale = event.currentTarget.value;
    const oldBodyClass = LocaleStyles.get(prevLocale) || '';
    const newBodyClass = LocaleStyles.get(newLocale) || '';

    context.setLocale(newLocale);
    settings.app.locale = newLocale;

    root.classList.replace(oldBodyClass, newBodyClass);
    applyLocaleLang();
  }

  function onUnitsChange(event: ChangeEvent<HTMLSelectElement>): void {
    const units = event.currentTarget.value;

    context.setLocale(units);
    settings.app.units = units;
  }

  return (
    <fieldset className="form__fieldset">
      <legend className="form__fieldset__legend">
        <FormattedMessage id="settings.app.title" />
      </legend>
      <Field
        inputName="theme"
        labelText={ <FormattedMessage id="settings.app.darkMode" /> }>
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
      { shouldEnableLocaleSelect &&
        <Field
          inputName="language"
          labelText={ <FormattedMessage id="settings.app.language" />}>
          <select
            className="field__select"
            defaultValue={ settings.app.locale }
            id="locale"
            name="locale"
            onChange={ onLocaleChange }>
              <option value={ Locales.EN }>English</option>
              <option value={ Locales.ES }>Española</option>
              <option value={ Locales.PL }>Polski</option>
          </select>
        </Field>
      }
      <Field
        inputName="fontSize"
        labelText={ <FormattedMessage id="settings.app.fontSize" /> }>
        <select
          className="field__select"
          defaultValue={ settings.app.fontSize }
          id="fontSize"
          name="fontSize"
          onChange={ onFontSizeChange }>
            <option value={ FontSizeStyles.ExtraSmall }>{ getLocalizedStringByKey('fontSizes.extraSmall') }</option>
            <option value={ FontSizeStyles.Small }>{ getLocalizedStringByKey('fontSizes.small') }</option>
            <option value={ FontSizeStyles.Medium }>{ getLocalizedStringByKey('fontSizes.medium') }</option>
            <option value={ FontSizeStyles.Large }>{ getLocalizedStringByKey('fontSizes.large') }</option>
            <option value={ FontSizeStyles.ExtraLarge }>{ getLocalizedStringByKey('fontSizes.extraLarge') }</option>
          </select>
      </Field>
      <Field
        inputName="fontSize"
        labelText={ <FormattedMessage id="settings.app.units" /> }>
        <select
          className="field__select"
          defaultValue={ settings.app.units }
          id="units"
          name="units"
          onChange={ onUnitsChange }>
            <option value={ Units.Imperial }>{ getLocalizedStringByKey('settings.app.units.imperial') }</option>
            <option value={ Units.Metric }>{ getLocalizedStringByKey('settings.app.units.metric') }</option>
          </select>
      </Field>
    </fieldset>
  );
}
