import React from 'react';

import './app-layout.css';

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
        {props.body}
      </main>
    </div>
  );
}

export default AppLayout;
