/**
 * ToggleButton
 * Button with 3 states that reflect timer status:
 * - inactive
 * - pending
 * - active
 */

import React, { SyntheticEvent, useContext, useState, useEffect, useRef } from 'react';

import { TimertronContext } from '../../context';
import { TimertronConfig } from '../../data/Config';

interface IProps {
  onClick: () => void,
}

export default function ToggleButton(props: IProps) {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(TimertronConfig.beepDelayinSeconds);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

  const context = useContext(TimertronContext);
  const isMountedRef = useRef<boolean>(false); // NOTE: used to address issue w/ setState in umounted component when user navigates away during active timer

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

    const newIntervalId = window.setInterval(() => {
      if (isMountedRef.current === true) {
        remaining--;
        setSecondsRemaining(remaining);
      }
    }, 1000);

    setIntervalId(newIntervalId);
  }

  function stopCountdown(): void {
    setSecondsRemaining(TimertronConfig.beepDelayinSeconds);

    window.clearInterval(intervalId);
    setIntervalId(undefined);
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

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      window.clearInterval(intervalId);
    }
    // NOTE: disabling because no array or array of deps triggers on every render, breaking functionality
    // eslint-disable-next-line
  }, [])

  return (
    <button
      type="button"
      className={`button button--yuge button--flex-3 ${ getButtonStyle() }`} 
      onClick={ onClick }>{ getButtonText() }</button>
  );
}
