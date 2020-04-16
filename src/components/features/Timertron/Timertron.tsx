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
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';

import INavigationItem from '../../../interfaces/NavigationItem';
import FeatureWithBottomButtonLayout from '../../layouts/FeatureWithBottomButtonLayout/FeatureWithBottomButtonLayout';
import ResetButton from './components/ResetButton';
import TimerDisplay from './components/TimerDisplay';
import ToggleButton from './components/ToggleButton';
import { ITimertronContext, TimertronContext } from './context';
import { TimertronConfig } from './data/Config';
import { TimertronDefaults } from './data/Defaults';

import './timertron.css';

const localStorage = window.localStorage;
const defaults = TimertronDefaults;
const micAccessKey = 'isMicAccessGranted';

export const TimertronNavConfig: INavigationItem = {
  route: '/timer',
  icon: 'timer',
  displayName: 'Shot Timer',
};

export default function Timertron(props: RouteComponentProps) {
  const [isTimerActive, setIsTimerActive] = useState<boolean>(defaults.isTimerActive);
  const [interval, setInterval] = useState<number | undefined>(defaults.interval);
  const [timeElapsed, setTimeElapsed] = useState<number>(defaults.timeElapsed);
  const [timeout, setTimeout] = useState<number | undefined>(defaults.timeout);
  // NOTE: using with localStorage to prevent brief flash of false-y UI on reload/remount
  const [isMicAccessGranted, setIsMicAccessGranted] = useState<boolean>((localStorage.getItem(micAccessKey) === 'true') || defaults.isMicAccessGranted);
  const [mediaStream, setMediaStream] = useState<MediaStream | undefined>(defaults.mediaStream);
  const [audioProcessor, setAudioProcessor] = useState<ScriptProcessorNode | undefined>(defaults.audioProcessor);

  const outputElRef = useRef<HTMLAudioElement>(null);
  const inputElRef = useRef<HTMLAudioElement>(null);

  function startAudioStreamCapture(): void {
    if (mediaStream) {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(mediaStream);
      const processor = audioContext.createScriptProcessor(1024, 1, 1);
      let audioBuffer;
      let absValue;

      setAudioProcessor(processor);

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = function(event) {
        audioBuffer = event.inputBuffer.getChannelData(0);

        for (var i = 0; i < audioBuffer.length; i++) {
          absValue = Math.abs(audioBuffer[i]);
          // console.log(absValue >= 1.0 ? `clipped @ ${Date.now()}` : audioBuffer[i]);
          if (absValue >= 1.0) {
            break;
          }
        }
      }
    }
  }

  function startTimer(): void {
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      setTimeElapsed((Date.now() - startedAt))
    }, 1); // Thanks Mark!

    setInterval(interval);
    startAudioStreamCapture();
  }

  function stopTimer(): void {
    if (audioProcessor) {
      audioProcessor.disconnect();
      audioProcessor.onaudioprocess = null;
      setAudioProcessor(defaults.audioProcessor);
    }

    // NOTE: clear timeout here in case stop is pressed before time actually starts
    window.clearTimeout(timeout);
    setTimeout(defaults.timeout);

    window.clearInterval(interval);
    setInterval(defaults.interval);

    setIsTimerActive(defaults.isTimerActive);
  }

  function onResetButtonClick(): void {
    if (isTimerActive) {
      stopTimer();
    }

    setInterval(undefined);
    setTimeElapsed(0);
  }

  function initiateStartDelay() {
    outputElRef.current?.play();
    window.clearTimeout(timeout);
    setTimeout(defaults.timeout);
    startTimer();
  }

  function onToggleButtonClick(event: SyntheticEvent): void {
    if (!isTimerActive) {
      setIsTimerActive(true);
      const delayInMs = TimertronConfig.beepDelayinSeconds * 1000;
      setTimeout(window.setTimeout(initiateStartDelay, delayInMs));
    } else {
      stopTimer();
    }
  }

  function configureAudioInput(): void {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    }).then((stream: MediaStream) => {
      setIsMicAccessGranted(true);
      localStorage.setItem(micAccessKey, 'true');

      if (inputElRef.current) {
        inputElRef.current.srcObject = stream;
        setMediaStream(stream);
      }
    }).catch((error) => {
      // TODO: how to re-request permission?
      // https://stackoverflow.com/questions/15993581/reprompt-for-permissions-with-getusermedia-after-initial-denial
      console.error('permission denied');
    })
  }

  useEffect(() => {
    navigator.permissions.query({name:'microphone'})
      .then((result: PermissionStatus) => {
        if (result.state === 'granted') {
          configureAudioInput();
        }
      })

    // "unmount" clean up
    return () => {
      if (audioProcessor) {
        audioProcessor.disconnect();
        audioProcessor.onaudioprocess = null;
        setAudioProcessor(defaults.audioProcessor);
      }

      window.clearInterval(interval);
      setInterval(defaults.interval);
      
      window.clearTimeout(timeout);
      setTimeout(defaults.timeout);

      setTimeElapsed(defaults.timeElapsed);
      setIsTimerActive(defaults.isTimerActive);
      setMediaStream(defaults.mediaStream);
    }
    // NOTE: disabling because no array or array of deps triggers on every render, breaking functionality
    // eslint-disable-next-line
  }, [])


  const featureContext: ITimertronContext = {
    isTimerActive,
    setIsTimerActive,
    interval,
    setInterval,
    timeElapsed,
    setTimeElapsed,
    timeout,
    setTimeout,
    isMicAccessGranted,
    setIsMicAccessGranted,
    mediaStream,
    setMediaStream,
    audioProcessor,
    setAudioProcessor,
  }

  return (
    <TimertronContext.Provider value={ featureContext }>
      <TimertronContext.Consumer>
        {value =>
          <form
            id="Timertron"
            className="form">
            <FeatureWithBottomButtonLayout
              mainAreaContent={
                <>
                  <TimerDisplay onRequestMicAccessClick={ configureAudioInput } />
                  <audio ref={ inputElRef } />
                  <audio
                    ref={ outputElRef }
                    src={ `${process.env.PUBLIC_URL}/beep.mp3` }
                    preload="auto" />
                </>
              }
              buttonAreaContent={ 
                <div className="button-container">
                  <ResetButton onClick={ onResetButtonClick } />
                  <ToggleButton onClick={ onToggleButtonClick } />
                </div>
               } />
          </form>
        }
      </TimertronContext.Consumer>
    </TimertronContext.Provider>
  );
}
