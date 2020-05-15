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
import DefaultLayout from '../../layouts/Default';

import './timertron.scss';

const defaults = TimertronDefaults;

export const TimertronNavConfig: INavigationItem = {
  route: '/timer',
  icon: 'timer',
  displayNameKey: 'Shot Timer',
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

  const isPermissionQueryApiSupported = navigator.permissions?.query != null;
  const isStandAlone = window.matchMedia('(display-mode: standalone)').matches;
  const platform = isStandAlone ? 'operating system' : 'browser';

  const featureBody = <Tabs
    tabNames={ ['Timer', 'Settings'] }
    tabContents={ [
      <TimerTabBody />,
      <SettingsTabBody />                  
    ] } />

  const errorPanel = <DefaultLayout>
    <div className="b-callout">
      <i className="material-icons b-callout__icon">sentiment_dissatisfied</i>
      <p className="b-callout__blurb">This feature requires permissions that are not supported by your { platform }.</p>
      {/* If they're in standalone mode, using a different browser won't help them */}
      { !isStandAlone &&
        <p className="b-callout__blurb">Download <a href="https://apps.apple.com/us/app/google-chrome/id535886823">Chrome</a> or <a href="https://apps.apple.com/us/app/id989804926">Firefox</a> and use those to come back and try again.</p>
      }
    </div>
  </DefaultLayout>;

  return (
    <TimertronContext.Provider value={ featureContext }>
      <TimertronContext.Consumer>
        { value =>
          <div id="Timertron">
            { isPermissionQueryApiSupported ? 
                featureBody
              :
                errorPanel
            }
          </div>
        }
      </TimertronContext.Consumer>
    </TimertronContext.Provider>
  );
}
