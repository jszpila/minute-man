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

import React, { useState } from 'react';
import { Router } from '@reach/router';
import AppLayout from './components/layouts/AppLayout/AppLayout';
import AppBar from './components/AppBar';
import Clickulator, { ClickulatorRoute } from './components/features/Clickulator/Clickulator';
import { AppContext, IAppContext } from './context/AppContext';
import { AppDefaultValues } from './data/AppDefaults';
import InfoModal from './components/InfoModal';
import Menu from './components/Menu';
import Timertron, { TimertronRoute } from './components/features/Timertron/Timertron';

import './App.css';

export default function App() {
  const [shouldShowInfoModal, updateShouldShowInfoModal] = useState<boolean>(AppDefaultValues.shouldShowInfoModal);
  const [shouldShowInstallButton, updateShouldShowInstallButton] = useState<boolean>(AppDefaultValues.shouldShowInstallButton);
  const [shouldShowMenu, updateShouldShowMenu] = useState<boolean>(AppDefaultValues.shouldShowMenu);

  const contextValue: IAppContext = {
    shouldShowInfoModal,
    updateShouldShowInfoModal,
    shouldShowInstallButton,
    updateShouldShowInstallButton,
    shouldShowMenu,
    updateShouldShowMenu,
  }

  return (
    <AppContext.Provider value={contextValue}>
      <AppContext.Consumer>
      { value =>
        <>
          <AppLayout
            header={<AppBar/>}
            body={
              <Router id="router">
                <Clickulator path={ ClickulatorRoute } />
                <Timertron path={ TimertronRoute} />
              </Router>
            } />
          <InfoModal />
          <Menu />
        </>
      }
      </AppContext.Consumer>
    </AppContext.Provider>
  );
}
