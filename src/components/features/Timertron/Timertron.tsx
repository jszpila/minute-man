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
import React, { useEffect, useRef, useState } from 'react';

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
  const [intervalId, setIntervalId] = useState<number | undefined>(defaults.intervalId);
  const [timeElapsed, setTimeElapsed] = useState<number>(defaults.timeElapsed);
  const [timeoutId, setTimeoutId] = useState<number | undefined>(defaults.timeoutId);
  // NOTE: using with localStorage to prevent brief flash of false-y UI on reload/remount
  const [isMicAccessGranted, setIsMicAccessGranted] = useState<boolean>((localStorage.getItem(micAccessKey) === 'true') || defaults.isMicAccessGranted);
  const [mediaStream, setMediaStream] = useState<MediaStream | undefined>(defaults.mediaStream);
  const [audioProcessor, setAudioProcessor] = useState<ScriptProcessorNode | undefined>(defaults.audioProcessor);

  const outputElRef = useRef<HTMLAudioElement>(null);
  const inputElRef = useRef<HTMLAudioElement>(null);
  const isMountedRef = useRef<boolean>(false);

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
      if (isMountedRef.current === true) {
        setTimeElapsed((Date.now() - startedAt))
      }
    }, 1); // Thanks Mark!

    if (isMountedRef.current === true) {
      setIntervalId(interval);
      startAudioStreamCapture();
    }
  }

  function stopTimer(): void {
    if (isMountedRef.current === true) {
      if (audioProcessor) {
        audioProcessor.disconnect();
        audioProcessor.onaudioprocess = null;
        setAudioProcessor(defaults.audioProcessor);
      }

      // NOTE: clear timeout here in case stop is pressed before timer starts
      window.clearTimeout(timeoutId);
      setTimeoutId(defaults.timeoutId);

      window.clearInterval(intervalId);
      setIntervalId(defaults.intervalId);

      setIsTimerActive(defaults.isTimerActive);
    }
  }

  function onResetButtonClick(): void {
    if (isTimerActive) {
      stopTimer();
    }

    setIntervalId(TimertronDefaults.intervalId);
    setTimeElapsed(TimertronDefaults.timeElapsed);
  }

  function issueStartSignal() {
    outputElRef.current?.play();
    window.clearTimeout(timeoutId);

    if (isMountedRef.current === true) {
      setTimeoutId(defaults.timeoutId);
    }

    startTimer();
  }

  function onToggleButtonClick(): void {
    if (!isTimerActive) {
      const delayInMs = TimertronConfig.beepDelayinSeconds * 1000;

      if (isMountedRef.current === true) {
        setIsTimerActive(true);
        setTimeElapsed(TimertronDefaults.timeElapsed);
        setTimeoutId(window.setTimeout(issueStartSignal, delayInMs));
      }
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
    isMountedRef.current = true;

    navigator.permissions.query({name:'microphone'})
      .then((result: PermissionStatus) => {
        if (result.state === 'granted') {
          configureAudioInput();
        }
      })

    // "unmount" clean up
    return () => {
      isMountedRef.current = false;

      if (audioProcessor) {
        audioProcessor.disconnect();
        audioProcessor.onaudioprocess = null;
      }

      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    }
    // NOTE: disabling because no array or array of deps triggers on every render, breaking functionality
    // eslint-disable-next-line
  }, [])

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
  }

  return (
    <TimertronContext.Provider value={ featureContext }>
      <TimertronContext.Consumer>
        { value =>
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
