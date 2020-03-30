import React, { useContext } from 'react';

import Logo from '../Logo';
import InfoButton from './InfoButton';

import './app-bar.css';
import { AppContext } from '../../context/AppContext';

function AppBar() {
  const context = useContext(AppContext);

  return (
    <nav className="app-bar">
      <div className="app-bar__logo">
        <Logo 
          height={'3rem'}
          width={'3rem'} />
      </div>
      <div className="app-bar__body">
        <h1 className="txt__heading-1">MinuteMan</h1>
      </div>
      <div className="app-bar__buttons">
        <InfoButton />
        <b>{context.shouldShowInfoModal}</b>
      </div>
    </nav>
  );
}

export default AppBar;
