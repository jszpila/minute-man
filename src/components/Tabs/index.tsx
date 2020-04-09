/**
 * FieldSet
 * Presentational component for inputs
 */

import React, { SyntheticEvent, useState } from 'react';

import './tabs.css';

interface IProps {
  tabNames: Array<string>,
  tabContents: Array<React.ReactNode>,
  activeTabIndex?: number,
}

export default function Tabs(props: IProps) {
  const [activeTabIndex, updateActiveTabIndex] = useState(0);

  function onTabClick(index: number): void {
    updateActiveTabIndex(index);
  }

  function getStatefulClassName(index: number, className: string): string {
    return index === activeTabIndex ? `${className} ${className}--active` : className;
  }

  return (
    <div className="tabs">
      <nav className="tabs__nav">
        {
          props.tabNames.map((name: string, index: number) => {
            return <button 
              className={ getStatefulClassName(index, 'tabs__nav__button') }
              key={index}
              onClick={(event: SyntheticEvent) => { event.stopPropagation(); onTabClick(index) }}
              type="button">
                {name}
              </button>
          })
        }
      </nav>
      <main className="tabs__content-container">
        {
          props.tabContents.map((node: React.ReactNode, index: number) => {
            return <section
              className={ getStatefulClassName(index, 'tabs__content-pane') }
              key={index}>
                {node}
              </section>
          })
        }
      </main>
    </div>
  );
}

Tabs.defaultProps = {
  activeTabIndex: 0,
}

