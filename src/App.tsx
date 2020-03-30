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

function App() {
  const [shouldShowInfoModal, updateShouldShowInfoModal] = useState<boolean>(AppDefaultValues.shouldShowInfoModal);
  const [shouldShowInstallButton, updateShouldShowInstallButton] = useState<boolean>(AppDefaultValues.shouldShowInstallButton);

  const contextValue: IAppContext = {
    shouldShowInfoModal,
    updateShouldShowInfoModal,
    shouldShowInstallButton,
    updateShouldShowInstallButton,
  }

  return (
    <AppContext.Provider value={contextValue}>
      <AppContext.Consumer>
      { value =>
        <AppLayout
          header={<AppBar/>}
          body={<Clickulator/>}/>
      }
      </AppContext.Consumer>
    </AppContext.Provider>
  );
}

export default App;
