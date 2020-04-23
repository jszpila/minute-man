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

import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';

import AppBar from './components/AppBar';
import Clickulator, { ClickulatorNavConfig } from './components/features/Clickulator/Clickulator';
import Settings, { SettingsNavConfig, ThemeKey } from './components/features/Settings/Settings';
import Timertron, { TimertronNavConfig } from './components/features/Timertron/Timertron';
import InfoModal from './components/InfoModal';
import AppLayout from './components/layouts/AppLayout/AppLayout';
import Menu from './components/Menu';
import { AppContext, IAppContext } from './context/AppContext';
import { AppDefaultValues } from './data/AppDefaults';

import './App.css';

export default function App() {
  const navItems = [ClickulatorNavConfig, TimertronNavConfig, SettingsNavConfig];
  const [shouldShowInfoModal, setShouldShowInfoModal] = useState<boolean>(AppDefaultValues.shouldShowInfoModal);
  const [shouldShowInstallButton, setShouldShowInstallButton] = useState<boolean>(AppDefaultValues.shouldShowInstallButton);
  const [shouldShowMenu, setShouldShowMenu] = useState<boolean>(AppDefaultValues.shouldShowMenu);
  const [theme, setTheme] = useState<string>(AppDefaultValues.theme);

  const contextValue: IAppContext = {
    shouldShowInfoModal,
    setShouldShowInfoModal,
    shouldShowInstallButton,
    setShouldShowInstallButton,
    shouldShowMenu,
    setShouldShowMenu,
    theme,
    setTheme,
  }

  useEffect(() => {
    const persistedThemeValue = localStorage.getItem(ThemeKey);
    const initialTheme = persistedThemeValue !== null ? persistedThemeValue : AppDefaultValues.theme;

    document.documentElement.classList.add(initialTheme);
    setTheme(initialTheme);
  }, []);

  return (
    <AppContext.Provider value={ contextValue }>
      <AppContext.Consumer>
      { value =>
        <>
          <AppLayout
            header={ <AppBar/> }
            body={
              <Router id="router">
                <Clickulator path={ ClickulatorNavConfig.route } />
                <Timertron path={ TimertronNavConfig.route } />
                <Settings path={ SettingsNavConfig.route } />
              </Router>
            } />
          <InfoModal />
          <Menu navItems={ navItems } />
        </>
      }
      </AppContext.Consumer>
    </AppContext.Provider>
  );
}
