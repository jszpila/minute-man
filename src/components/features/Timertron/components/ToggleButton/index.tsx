/**
 * ToggleButton
 * Button with 3 states that reflect timer status:
 * - inactive
 * - pending
 * - active
 */

import React, { SyntheticEvent, useContext } from 'react';

import { TimertronContext } from '../../context';

interface IProps {
  onClick: (event: SyntheticEvent) => void,
}

export default function ToggleButton(props: IProps) {
  const context = useContext(TimertronContext);

  function getButtonStyle(): string {
    let style = '';

    if (!context.isTimerActive) {
      style = 'button--primary';
    } else if (context.isTimerActive
      && context.timeElapsed === 0) {
        style = '';
    } else {
      style = 'button--danger';
    }

    return style;
  }

  // TODO: countdown on button
  function getButtonText(): string | React.ReactNode {
    let text;

    if (!context.isTimerActive) {
      text = 'Start';
    } else if (context.isTimerActive
      && context.timeElapsed === 0) {
        text = <>Waiting <span className="txt--muted">(Press to Cancel)</span></>;
    } else {
      text = 'Stop';
    }

    return text;
  }

  return (
    <button
      type="button"
      className={`button button--yuge button--flex-3 button--push-l ${ getButtonStyle() }`} 
      onClick={ props.onClick }>{ getButtonText() }</button>
  );
}
