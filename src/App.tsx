import { Router } from '@reach/router';
/**
 * 
 *     ▄▄▄▄███▄▄▄▄    ▄█  ███▄▄▄▄   ███    █▄      ███        ▄████████   ▄▄▄▄███▄▄▄▄      ▄████████ ███▄▄▄▄   
 *  ▄██▀▀▀███▀▀▀██▄ ███  ███▀▀▀██▄ ███    ███ ▀█████████▄   ███    ███ ▄██▀▀▀███▀▀▀██▄   ███    ███ ███▀▀▀██▄ 
 *  ███   ███   ███ ███▌ ███   ███ ███    ███    ▀███▀▀██   ███    █▀  ███   ███   ███   ███    ███ ███   ███ 
 *  ███   ███   ███ ███▌ ███   ███ ███    ███     ███   ▀  ▄███▄▄▄     ███   ███   ███   ███    ███ ███   ███ 
 *  ███   ███   ███ ███▌ ███   ███ ███    ███     ███     ▀▀███▀▀▀     ███   ███   ███ ▀███████████ ███   ███ 
 *  ███   ███   ███ ███  ███   ███ ███    ███     ███       ███    █▄  ███   ███   ███   ███    ███ ███   ███ 
 *  ███   ███   ███ ███  ███   ███ ███    ███     ███       ███    ███ ███   ███   ███   ███    ███ ███   ███ 
 *   ▀█   ███   █▀  █▀    ▀█   █▀  ████████▀     ▄████▀     ██████████  ▀█   ███   █▀    ███    █▀   ▀█   █▀  
 *                                                                                                           
 */

import React, { useEffect, useState } from 'react';
import { IntlProvider } from "react-intl";

import AppBar from './components/AppBar';
import Clickulator, { ClickulatorNavConfig } from './components/features/Clickulator/Clickulator';
import Settings, { SettingsNavConfig } from './components/features/Settings/Settings';
import SettingsStore from './components/features/Settings/SettingsStore';
// import Timertron, { TimertronNavConfig } from './components/features/Timertron/Timertron';
import InfoModal from './components/InfoModal';
import AppLayout from './components/layouts/AppLayout';
import Menu from './components/Menu';
import { AppContext, IAppContext } from './context/AppContext';
import AppDefaultValues from './data/AppDefaults';
import { applyLocaleLang, localizations } from './util/L10n';
import LocaleStyles from './data/locale/LocaleStyles';

import './App.scss';

export default function App() {
  const settings = SettingsStore.getInstance();

  const [locale, setLocale] = useState<string>(settings.app.locale);
  const [shouldShowInfoModal, setShouldShowInfoModal] = useState<boolean>(AppDefaultValues.shouldShowInfoModal);
  const [shouldShowInstallButton, setShouldShowInstallButton] = useState<boolean>(AppDefaultValues.shouldShowInstallButton);
  const [shouldShowMenu, setShouldShowMenu] = useState<boolean>(AppDefaultValues.shouldShowMenu);
  const [theme, setTheme] = useState<string>(settings.app.theme);
  const [fontSize, setFontSize] = useState<string>(settings.app.fontSize);
  const [units, setUnits] = useState<string>(settings.app.units);

  const contextValue: IAppContext = {
    locale,
    setLocale,
    fontSize,
    setFontSize,
    shouldShowInfoModal,
    setShouldShowInfoModal,
    shouldShowInstallButton,
    setShouldShowInstallButton,
    shouldShowMenu,
    setShouldShowMenu,
    theme,
    setTheme,
    units,
    setUnits,
  }

  const navItems = [
    ClickulatorNavConfig,
    // TimertronNavConfig,
    SettingsNavConfig,
  ];

  useEffect(() => {
    const localeClass = LocaleStyles.get(settings.app.locale) || ''
    document.documentElement.classList.add(settings.app.theme, settings.app.fontSize, localeClass);
    setTheme(settings.app.theme);
    applyLocaleLang();
  }, [settings.app.theme, settings.app.locale, settings.app.fontSize]);

  return (
    <IntlProvider
      locale={ settings.app.locale }
      messages={ localizations.get(settings.app.locale) } >
      <AppContext.Provider value={ contextValue }>
        <AppContext.Consumer>
        { value =>
          <>
            <AppLayout
              header={ <AppBar/> }
              body={
                <Router id="router">
                  <Clickulator path={ ClickulatorNavConfig.route } />
                  {/* <Timertron path={ TimertronNavConfig.route } /> */}
                  <Settings path={ SettingsNavConfig.route } />
                </Router>
              } />
            <InfoModal />
            <Menu navItems={ navItems } />
          </>
        }
        </AppContext.Consumer>
      </AppContext.Provider>
    </IntlProvider>
  );
}
