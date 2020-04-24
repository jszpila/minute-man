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

import { RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';

import INavigationItem from '../../../interfaces/NavigationItem';
import Tabs from '../../Tabs';
import SettingsTabBody from './components/SettingsTabBody';
import TimerTabBody from './components/TimerTabBody';
import { ITimertronContext, TimertronContext } from './context';
import { TimertronConfig } from './data/Config';
import { TimertronDefaults } from './data/Defaults';
import { LocalStorageKeys } from '../../../enum/LocalStorageKeys';
import './timertron.css';

const defaults = TimertronDefaults;

export const TimertronNavConfig: INavigationItem = {
  route: '/timer',
  icon: 'timer',
  displayName: 'Shot Timer',
};

export default function Timertron(props: RouteComponentProps) {
  const [isTimerActive, setIsTimerActive] = useState<boolean>(defaults.isTimerActive);
  const [intervalId, setIntervalId] = useState<number | undefined>(defaults.intervalId);
  const [timeElapsed, setTimeElapsed] = useState<number>(defaults.timeElapsed);
  const [timeoutId, setTimeoutId] = useState<number | undefined>(defaults.timeoutId);
  // NOTE: using with localStorage to prevent brief flash of false-y UI on reload/remount
  const [isMicAccessGranted, setIsMicAccessGranted] = useState<boolean>((localStorage.getItem(LocalStorageKeys.IsMicAccessGranted) === 'true') || defaults.isMicAccessGranted);
  const [mediaStream, setMediaStream] = useState<MediaStream | undefined>(defaults.mediaStream);
  const [audioProcessor, setAudioProcessor] = useState<ScriptProcessorNode | undefined>(defaults.audioProcessor);
  const [timerMode, setTimerMode] = useState<string>(TimertronConfig.timerMode);

  const featureContext: ITimertronContext = {
    isTimerActive,
    setIsTimerActive,
    intervalId,
    setIntervalId,
    timeElapsed,
    setTimeElapsed,
    timeoutId,
    setTimeoutId,
    isMicAccessGranted,
    setIsMicAccessGranted,
    mediaStream,
    setMediaStream,
    audioProcessor,
    setAudioProcessor,
    timerMode,
    setTimerMode,
  }

  return (
    <TimertronContext.Provider value={ featureContext }>
      <TimertronContext.Consumer>
        { value =>
          <div id="Timertron">
            <Tabs
              tabNames={ ['Timer', 'Settings'] }
              tabContents={ [
                <TimerTabBody />,
                <SettingsTabBody />                  
              ] } />
          </div>
        }
      </TimertronContext.Consumer>
    </TimertronContext.Provider>
  );
}
