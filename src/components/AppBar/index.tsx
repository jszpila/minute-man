import React from 'react';

import Logo from './Logo';
import A2HSButton from './A2HSButton';
import MenuButton from './MenuButton';

import './app-bar.css';

export default function AppBar() {
  return (
    <nav className="app-bar">
      <div className="app-bar__logo">
        <Logo 
          height={'2.5rem'}
          width={'2.5rem'} />
      </div>
      <div className="app-bar__body">
        <h1 className="txt__heading-1">{`${process.env.REACT_APP_NAME_STYLIZED}`}</h1>
      </div>
      <div className="app-bar__buttons">
        <A2HSButton />
        <MenuButton />
      </div>
    </nav>
  );
}
