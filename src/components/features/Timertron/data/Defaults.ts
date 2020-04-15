import { TimerMode } from "../enum/TimerMode";

export const TimertronDefaults = {
  instantBeep: false,
  beepDelay: 3000,
  timerMode: TimerMode.Comstock,
  isTimerActive: false,
  interval: undefined,
  timeElapsed: 0,
  timeout: undefined,
  isMicAccessGranted: false,
  mediaStream: undefined,
  audioProcessor: undefined,
}
