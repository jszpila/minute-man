import { TimerMode } from "../enum/TimerMode";

export const TimertronDefaults = {
  beepDelayinSeconds: 3,
  timerMode: TimerMode.Comstock,
  isTimerActive: false,
  interval: undefined,
  timeElapsed: 0,
  timeout: undefined,
  isMicAccessGranted: false,
  mediaStream: undefined,
  audioProcessor: undefined,
}
