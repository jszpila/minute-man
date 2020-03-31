import React from 'react';

import Logo from './Logo';
import InfoButton from './InfoButton';
import A2HSButton from './A2HSButton';

import './app-bar.css';

function AppBar() {
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
        <A2HSButton />
        <InfoButton />
      </div>
    </nav>
  );
}

export default AppBar;
