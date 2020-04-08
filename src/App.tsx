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
import AppLayout from './components/layouts/AppLayout/AppLayout';
import AppBar from './components/AppBar';
import Clickulator from './components/features/Clickulator/Clickulator';
import { AppContext, IAppContext } from './context/AppContext';
import { AppDefaultValues } from './data/AppDefaults';

import './App.css';
import InfoModal from './components/InfoModal';
import Menu from './components/Menu';

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
            body={<Clickulator/>} />
          <InfoModal />
          <Menu />
        </>
      }
      </AppContext.Consumer>
    </AppContext.Provider>
  );
}
