import React from 'react';
import GlobalWarning from '../../GlobalWarning'

import './app-layout.scss';

interface IProps {
  header: React.ReactNode,
  body: React.ReactNode,
};

function AppLayout(props: IProps) {
  return (
    <div className="app app-layout">
      <header className="app-layout__header">
        {props.header}
      </header>
      <main className="app-layout__main">
        <GlobalWarning />
        {props.body}
      </main>
    </div>
  );
}

export default AppLayout;
