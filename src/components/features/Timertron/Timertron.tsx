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

import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';

import INavigationItem from '../../../interfaces/NavigationItem';
import FeatureWithBottomButtonLayout from '../../layouts/FeatureWithBottomButtonLayout/FeatureWithBottomButtonLayout';
import { TimerDefaults } from './data/TimerDefaults';

import './timertron.css';

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
  const [isMicAccessGranted, updateIsMicAccessGranted] = useState<boolean>(false);
  const [mediaStream, updateMediaStream] = useState<MediaStream | undefined>(undefined);
  const [audioProcessor, updateAudioProcessor] = useState<ScriptProcessorNode | undefined>(undefined);

  const audioElementRef = useRef<HTMLAudioElement>(null);
  const micElementRef = useRef<HTMLAudioElement>(null);

  const content = <div>
      { isMicAccessGranted ?
        <div>
          <div>Time Elapsed</div>
          <div className="txt--embiggen">{`${ formatElapseTime() }`}</div>
          <audio ref={ micElementRef } controls></audio>
        </div>
        : <div>Please grant microphone access :( </div> // TODO: add button to prompt for access
      }
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

  function getButtonText(): string | React.ReactNode {
    let text;

    if (!isTimerActive) {
      text = 'Start';
    } else if (isTimerActive
      && timeElapsed === 0) {
        text = <>Waiting <span className="txt--muted">(Press to Cancel)</span></>;
    } else {
      text = 'Stop';
    }

    return text;
  }

  function formatElapseTime(): string {
    return (timeElapsed / 1000).toFixed(3);
  }

  function startAudioStreamCapture(): void {
    console.log('attemping to start audio capture...');
    if (mediaStream != null) {
      console.log('media stream ok...');
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(mediaStream);
      const processor = audioContext.createScriptProcessor(1024, 1, 1);
      let audioBuffer;
      let absValue;

      updateAudioProcessor(processor);

      source.connect(processor);
      processor.connect(audioContext.destination);

      console.log(processor);

      processor.onaudioprocess = function(event) {
        console.log('onaudioprocess');
        audioBuffer = event.inputBuffer.getChannelData(0);

        for (var i = 0; i < audioBuffer.length; i++) {
          absValue = Math.abs(audioBuffer[i]);
          console.log(absValue >= 1.0 ? `clipped @ ${Date.now()}` : audioBuffer[i]);
          if (absValue >= 1.0) {
            break;
          }
        }
      }
    }
  }

  function startTimer(): void {
    const startedAt = Date.now();
    const interval = window.setInterval(() => 
      {updateTimeElapsed((Date.now() - startedAt))
    }, 1); // Thanks Mark!

    updateInterval(interval);
    startAudioStreamCapture();
  }

  function stopTimer(): void {
    window.clearTimeout(timeout); // clear timeout here in case stop is pressed before time actually starts
    window.clearInterval(interval);

    if (audioProcessor != null) {
      audioProcessor.disconnect();
      audioProcessor.onaudioprocess = null;
      updateAudioProcessor(undefined);
    }

    updateIsTimerActive(false);
  }

  function resetTimer(): void {
    if (isTimerActive) {
      stopTimer();
    }

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

  useEffect(() => {
    navigator.permissions.query({name:'microphone'}).then(function(result: PermissionStatus) {
      if (result.state !== 'granted') {
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        }).then((stream: MediaStream) => {
          console.log('got dat stream', stream)

          if (micElementRef.current) {
            micElementRef.current.srcObject = stream;
            updateMediaStream(stream);

            console.log('assigned dat stream');
          }
        })
      } else {
        updateIsMicAccessGranted(true);
      }

      result.onchange = function() {
        updateIsMicAccessGranted(result.state === 'granted');
      };
    });

    return () => {
      if (audioProcessor) {
        audioProcessor.disconnect();
        audioProcessor.onaudioprocess = null;
      }

      window.clearInterval(interval);
      updateInterval(undefined);
      
      window.clearTimeout(timeout);
      updateTimeout(undefined);

      updateTimeElapsed(0);
      updateIsTimerActive(false);
      // updateMediaStream(undefined)?
    }
    // NOTE: disabling because no array or array of deps triggers on every render, breaking functionality
    // eslint-disable-next-line
  }, [])

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
