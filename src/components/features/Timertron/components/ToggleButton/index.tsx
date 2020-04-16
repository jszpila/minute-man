/**
 * ToggleButton
 * Button with 3 states that reflect timer status:
 * - inactive
 * - pending
 * - active
 */

import React, { SyntheticEvent, useContext, useState } from 'react';

import { TimertronContext } from '../../context';
import { TimertronConfig } from '../../data/Config';

interface IProps {
  onClick: () => void,
}

export default function ToggleButton(props: IProps) {
  const context = useContext(TimertronContext);

  const [secondsRemaining, setSecondsRemaining] = useState<number>(TimertronConfig.beepDelayinSeconds);
  const [interval, setInterval] = useState<number | undefined>(undefined);

  // determineValueFromDerivedState?
  function getStatefulValue(inactiveVal: string, pendingVal: string, activeVal: string): string {
    let statefulVal = activeVal;
  
    if (!context.isTimerActive) {
      statefulVal = inactiveVal;
    } else if (context.isTimerActive
      && context.timeElapsed === 0) {
        statefulVal = pendingVal;
    }

    return statefulVal;
  }

  function getButtonStyle(): string {
    return getStatefulValue('button--primary', '', 'button--danger');
  }

  function getButtonText(): string | React.ReactNode {
    return getStatefulValue('Start', secondsRemaining.toString(), 'Stop');
  }

  function startCountdown(): void {
    let remaining = TimertronConfig.beepDelayinSeconds;

    const interval = window.setInterval(() => {
      remaining--;
      setSecondsRemaining(remaining);
    }, 1000);

    setInterval(interval);
  }

  function stopCountdown(): void {
    setSecondsRemaining(TimertronConfig.beepDelayinSeconds);

    clearInterval(interval);
    setInterval(undefined);
  }

  function onClick(event: SyntheticEvent) {
    props.onClick();

    const status = getStatefulValue('inactive', 'pending', 'active');

    if (status === 'inactive') {
      startCountdown();
    } else {
      stopCountdown();
    }
  }

  return (
    <button
      type="button"
      className={`button button--yuge button--flex-3 ${ getButtonStyle() }`} 
      onClick={ onClick }>{ getButtonText() }</button>
  );
}
