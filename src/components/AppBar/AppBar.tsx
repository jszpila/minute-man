import React from 'react';

import './app-bar.css';
import Logo from '../Logo';

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
    </nav>
  );
}

export default AppBar;
