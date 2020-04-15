import React, { Dispatch, SetStateAction } from 'react';

import { TimertronDefaults } from './data/Defaults';

export interface ITimertronContext {
  isTimerActive: boolean,
  updateIsTimerActive: (Dispatch<SetStateAction<boolean>>),
  interval: number | undefined,
  updateInterval:  (Dispatch<SetStateAction<number | undefined>>), 
  timeElapsed: number,
  updateTimeElapsed: (Dispatch<SetStateAction<number>>),
  timeout: number | undefined,
  updateTimeout: (Dispatch<SetStateAction<number | undefined>>),
  isMicAccessGranted: boolean,
  updateIsMicAccessGranted: (Dispatch<SetStateAction<boolean>>),
  mediaStream: MediaStream | undefined,
  updateMediaStream: (Dispatch<SetStateAction<MediaStream | undefined>>),
  audioProcessor: ScriptProcessorNode | undefined;
  updateAudioProcessor: (Dispatch<SetStateAction<ScriptProcessorNode | undefined>>)
}

const initialTimertronContext: ITimertronContext = {
  isTimerActive: TimertronDefaults.isTimerActive,
  updateIsTimerActive: (): void => {},
  interval: TimertronDefaults.interval,
  updateInterval: (): void => {},
  timeElapsed: TimertronDefaults.timeElapsed,
  updateTimeElapsed: (): void => {},
  timeout: TimertronDefaults.timeout,
  updateTimeout: (): void => {},
  isMicAccessGranted: TimertronDefaults.isMicAccessGranted,
  updateIsMicAccessGranted: (): void => {},
  mediaStream: TimertronDefaults.mediaStream,
  updateMediaStream: (): void => {},
  audioProcessor: TimertronDefaults.audioProcessor,
  updateAudioProcessor: (): void => {},
}

export const TimertronContext = React.createContext(initialTimertronContext);
