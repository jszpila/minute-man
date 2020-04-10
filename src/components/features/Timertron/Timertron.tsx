import { RouteComponentProps } from '@reach/router';
/**
 *                    
 *  _________  ___  _____ ______   _______   ________  _________  ________  ________  ________      
 * |\___   ___\\  \|\   _ \  _   \|\  ___ \ |\   __  \|\___   ___\\   __  \|\   __  \|\   ___  \    
 * \|___ \  \_\ \  \ \  \\\__\ \  \ \   __/|\ \  \|\  \|___ \  \_\ \  \|\  \ \  \|\  \ \  \\ \  \   
 *      \ \  \ \ \  \ \  \\|__| \  \ \  \_|/_\ \   _  _\   \ \  \ \ \   _  _\ \  \\\  \ \  \\ \  \  
 *       \ \  \ \ \  \ \  \    \ \  \ \  \_|\ \ \  \\  \|   \ \  \ \ \  \\  \\ \  \\\  \ \  \\ \  \ 
 *        \ \__\ \ \__\ \__\    \ \__\ \_______\ \__\\ _\    \ \__\ \ \__\\ _\\ \_______\ \__\\ \__\
 *         \|__|  \|__|\|__|     \|__|\|_______|\|__|\|__|    \|__|  \|__|\|__|\|_______|\|__| \|__|
 *                                                                 
 * Time the things!
 *
 */

import React, { SyntheticEvent, useRef, useState } from 'react';

import FeatureWithBottomButtonLayout from '../../layouts/FeatureWithBottomButtonLayout/FeatureWithBottomButtonLayout';
import INavigationItem from '../../../interfaces/NavigationItem';

import './timertron.css';
import { TimerDefaults } from './data/TimerDefaults';

export const TimertronNavConfig: INavigationItem = {
  route: '/timer',
  icon: 'timer',
  displayName: 'Shot Timer',
};

export default function Timertron(props: RouteComponentProps) {
  const [isTimerActive, updateIsTimerActive] = useState<boolean>(false);
  const [startTime, updateStartTime] = useState<number>(0);
  const [interval, updateInterval] = useState<number | undefined>(undefined);
  const [timeElapsed, updateTimeElapsed] = useState(0);
  const [timeout, updateTimeout] = useState<number | undefined>(undefined);

  const audioElementRef = useRef<HTMLAudioElement>(null);
  const content = <div><div>{ timeElapsed }</div><audio ref={ audioElementRef } src={ `${process.env.PUBLIC_URL}/beep.mp3` } preload="auto" /></div>;

  function startTimer() {
    console.log('timer started');
    updateIsTimerActive(true);
    updateStartTime(Date.now());
    updateInterval(window.setInterval(() => {updateTimeElapsed(Date.now() - startTime)}, 1));
  }

  function stopTimer() {
    console.log('timer stopped');
    window.clearInterval(interval)
    updateIsTimerActive(false);
    updateInterval(undefined);
  }

  function performDelayedBeep() {
    audioElementRef.current?.play();
    window.clearTimeout(timeout);
    updateTimeout(undefined);
    startTimer();
  }

  function onClick(event: SyntheticEvent): void {
    if (!isTimerActive) {
      updateTimeout(window.setTimeout(performDelayedBeep, TimerDefaults.beepDelay));
    } else {
      stopTimer();
    }
  }

  return (
      <>
        <form
          id="Timertron"
          className="form">
          <FeatureWithBottomButtonLayout
            content={ content }
            button={ <button type="button" className="button button--yuge" onClick={ onClick }>HEY</button> } />
        </form>
      </>
  );
}
