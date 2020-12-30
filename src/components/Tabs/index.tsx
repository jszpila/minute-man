/**
 * FieldSet
 * Presentational component for inputs
 */

import clsx from "clsx";
import React, { SyntheticEvent, useState } from "react";

import "./tabs.scss";

interface IProps {
  tabNames: Array<string>;
  tabContents: Array<React.ReactNode>;
  activeTabIndex?: number;
}

export default function Tabs(props: IProps) {
  const [activeTabIndex, updateActiveTabIndex] = useState(0);

  function onTabClick(index: number): void {
    updateActiveTabIndex(index);
  }

  function isActiveTab(index: number): boolean {
    return index === activeTabIndex;
  }

  return (
    <div className="tabs">
      <nav className="tabs__nav">
        {props.tabNames.map((name: string, index: number) => {
          return (
            <button
              className={clsx(
                "tabs__nav__button",
                isActiveTab(index) && "tabs__nav__button--active"
              )}
              key={index}
              onClick={(event: SyntheticEvent) => {
                event.stopPropagation();
                onTabClick(index);
              }}
              type="button"
            >
              {name}
            </button>
          );
        })}
      </nav>
      <main className="tabs__content-container">
        {props.tabContents.map((node: React.ReactNode, index: number) => {
          return (
            <section
              className={clsx(
                "tabs__content-pane",
                isActiveTab(index) && "tabs__content-pane--active"
              )}
              key={index}
            >
              {node}
            </section>
          );
        })}
      </main>
    </div>
  );
}

Tabs.defaultProps = {
  activeTabIndex: 0,
};
