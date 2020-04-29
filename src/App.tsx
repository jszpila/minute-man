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
import Settings, { SettingsNavConfig } from './components/features/Settings/Settings';
// import Timertron, { TimertronNavConfig } from './components/features/Timertron/Timertron';
import InfoModal from './components/InfoModal';
import AppLayout from './components/layouts/AppLayout';
import Menu from './components/Menu';
import { AppContext, IAppContext } from './context/AppContext';
import { AppDefaultValues } from './data/AppDefaults';
import SettingsStore from './components/features/Settings/SettingsStore';

import './App.scss';

export default function App() {
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

  const navItems = [
    ClickulatorNavConfig,
    // TimertronNavConfig,
    SettingsNavConfig,
  ];

  useEffect(() => {
    const settings = SettingsStore.getInstance();

    document.documentElement.classList.add(settings.app.theme);
    setTheme(settings.app.theme);
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
  );
}
