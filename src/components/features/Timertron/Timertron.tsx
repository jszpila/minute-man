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
  const [interval, updateInterval] = useState<number | undefined>(undefined);
  const [timeElapsed, updateTimeElapsed] = useState<number>(0);
  const [timeout, updateTimeout] = useState<number | undefined>(undefined);

  const audioElementRef = useRef<HTMLAudioElement>(null);
  const content = <div>
      <div>
          <div>Time Elapsed</div>
          <div className="txt--embiggen">{`${ formatElapseTime() }`}</div>
      </div>
      <audio ref={ audioElementRef } src={ `${process.env.PUBLIC_URL}/beep.mp3` } preload="auto" />
    </div>;
  const buttons = <div className="button-container">
      <button 
        type="button" 
        className={`button button--yuge button--flex-1 button--push-r`} 
        onClick={ resetTimer }> Reset </button>
      <button
        type="button"
        className={`button button--yuge button--flex-3 button--push-l ${ getButtonStyle() }`} 
        onClick={ onClick }> { getButtonText() } </button>
    </div>;

  function getButtonStyle(): string {
    let style = '';

    if (!isTimerActive) {
      style = 'button--primary';
    } else if (isTimerActive
      && timeElapsed === 0) {
        style = '';
    } else {
      style = 'button--danger';
    }

    return style;
  }

  function getButtonText(): string {
    let text = '';

    if (!isTimerActive) {
      text = 'Start';
    } else if (isTimerActive
      && timeElapsed === 0) {
        text = 'Waiting (Press to Cancel)';
    } else {
      text = 'Stop';
    }

    return text;
  }

  function formatElapseTime(): string {
    return (timeElapsed / 1000).toFixed(3);
  }

  function startTimer(): void {
    const startedAt = Date.now();
    const interval = window.setInterval(() => 
      {updateTimeElapsed((Date.now() - startedAt))
    }, 1); // Thanks Mark!

    updateInterval(interval);
  }

  function stopTimer(): void {
    window.clearTimeout(timeout); // clear timeout here in case stop is pressed before time actually starts
    window.clearInterval(interval);
    updateIsTimerActive(false);
  }

  function resetTimer(): void {
    updateInterval(undefined);
    updateTimeElapsed(0);
  }

  function initiateStartDelay() {
    audioElementRef.current?.play();
    window.clearTimeout(timeout);
    updateTimeout(undefined);
    startTimer();
  }

  function onClick(event: SyntheticEvent): void {
    if (!isTimerActive) {
      updateIsTimerActive(true);
      updateTimeout(window.setTimeout(initiateStartDelay, TimerDefaults.beepDelay));
    } else {
      stopTimer();
    }
  }

  // TODO: StatefulButton component
  return (
      <>
        <form
          id="Timertron"
          className="form">
          <FeatureWithBottomButtonLayout
            content={ content }
            button={ buttons } />
        </form>
      </>
  );
}
