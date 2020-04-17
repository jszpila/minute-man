/**
 * TimerTabBody
 */

import React, { useContext, useRef, useEffect } from 'react';

import { TimertronContext } from '../../context';
import { TimertronConfig } from '../../data/Config';
import FeatureWithBottomButtonLayout from '../../../../layouts/FeatureWithBottomButtonLayout/FeatureWithBottomButtonLayout';
import ResetButton from './ResetButton';
import ToggleButton from './ToggleButton';
import TimerDisplay from '../TimerDisplay';
import { TimertronDefaults } from '../../data/Defaults';
import { MicAccessKey } from '../../Timertron';

const localStorage = window.localStorage;
const defaults = TimertronDefaults;

export default function TimerTabBody() {
  const context = useContext(TimertronContext);

  const outputElRef = useRef<HTMLAudioElement>(null);
  const inputElRef = useRef<HTMLAudioElement>(null);
  const isMountedRef = useRef<boolean>(false);

  function startAudioStreamCapture(): void {
    if (context.mediaStream) {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(context.mediaStream);
      const processor = audioContext.createScriptProcessor(1024, 1, 1);
      let audioBuffer;
      let absValue;

      context.setAudioProcessor(processor);

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
        context.setTimeElapsed((Date.now() - startedAt))
      }
    }, 1); // Thanks Mark!

    if (isMountedRef.current === true) {
      context.setIntervalId(interval);
      startAudioStreamCapture();
    }
  }

  function stopTimer(): void {
    if (isMountedRef.current === true) {
      if (context.audioProcessor) {
        context.audioProcessor.disconnect();
        context.audioProcessor.onaudioprocess = null;
        context.setAudioProcessor(defaults.audioProcessor);
      }

      // NOTE: clear timeout here in case stop is pressed before timer starts
      window.clearTimeout(context.timeoutId);
      context.setTimeoutId(defaults.timeoutId);

      window.clearInterval(context.intervalId);
      context.setIntervalId(defaults.intervalId);

      context.setIsTimerActive(defaults.isTimerActive);
    }
  }

  function onResetButtonClick(): void {
    if (context.isTimerActive) {
      stopTimer();
    }

    context.setIntervalId(defaults.intervalId);
    context.setTimeElapsed(defaults.timeElapsed);
  }

  function issueStartSignal() {
    outputElRef.current?.play();
    window.clearTimeout(context.timeoutId);

    if (isMountedRef.current === true) {
      context.setTimeoutId(defaults.timeoutId);
    }

    startTimer();
  }

  function onToggleButtonClick(): void {
    if (!context.isTimerActive) {
      const delayInMs = TimertronConfig.beepDelayinSeconds * 1000;

      if (isMountedRef.current === true) {
        context.setIsTimerActive(true);
        context.setTimeElapsed(defaults.timeElapsed);
        context.setTimeoutId(window.setTimeout(issueStartSignal, delayInMs));
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
      context.setIsMicAccessGranted(true);
      localStorage.setItem(MicAccessKey, 'true');

      if (inputElRef.current) {
        inputElRef.current.srcObject = stream;
        context.setMediaStream(stream);
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

      if (context.audioProcessor) {
        context.audioProcessor.disconnect();
        context.audioProcessor.onaudioprocess = null;
      }

      window.clearInterval(context.intervalId);
      window.clearTimeout(context.timeoutId);
    }
    // NOTE: disabling because no array or array of deps triggers on every render, breaking functionality
    // eslint-disable-next-line
  }, [])

  return (
    <form className="form">
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
  );
}
