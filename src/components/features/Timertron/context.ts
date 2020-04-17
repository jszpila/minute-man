import React, { Dispatch, SetStateAction } from 'react';

import { TimertronDefaults } from './data/Defaults';

export interface ITimertronContext {
  isTimerActive: boolean,
  setIsTimerActive: (Dispatch<SetStateAction<boolean>>),
  intervalId: number | undefined,
  setIntervalId:  (Dispatch<SetStateAction<number | undefined>>), 
  timeElapsed: number,
  setTimeElapsed: (Dispatch<SetStateAction<number>>),
  timeoutId: number | undefined,
  setTimeoutId: (Dispatch<SetStateAction<number | undefined>>),
  isMicAccessGranted: boolean,
  setIsMicAccessGranted: (Dispatch<SetStateAction<boolean>>),
  mediaStream: MediaStream | undefined,
  setMediaStream: (Dispatch<SetStateAction<MediaStream | undefined>>),
  audioProcessor: ScriptProcessorNode | undefined;
  setAudioProcessor: (Dispatch<SetStateAction<ScriptProcessorNode | undefined>>)
}

const initialTimertronContext: ITimertronContext = {
  isTimerActive: TimertronDefaults.isTimerActive,
  setIsTimerActive: (): void => {},
  intervalId: TimertronDefaults.intervalId,
  setIntervalId: (): void => {},
  timeElapsed: TimertronDefaults.timeElapsed,
  setTimeElapsed: (): void => {},
  timeoutId: TimertronDefaults.timeoutId,
  setTimeoutId: (): void => {},
  isMicAccessGranted: TimertronDefaults.isMicAccessGranted,
  setIsMicAccessGranted: (): void => {},
  mediaStream: TimertronDefaults.mediaStream,
  setMediaStream: (): void => {},
  audioProcessor: TimertronDefaults.audioProcessor,
  setAudioProcessor: (): void => {},
}

export const TimertronContext = React.createContext(initialTimertronContext);
