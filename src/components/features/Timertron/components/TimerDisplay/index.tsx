/**
 * TimerDisplay
 * Display current time elapsed
 * OR button to request microphone access
 */

import React, { SyntheticEvent, useContext } from 'react';

import { TimertronContext } from '../../context';
import { TimertronConfig } from '../../data/Config';

interface IProps {
  onRequestMicAccessClick: () => void,
}

export default function TimerDisplay(props: IProps) {
  const context = useContext(TimertronContext);

  function formatElapseTime(): string {
    return (context.timeElapsed / 1000).toFixed(TimertronConfig.timerDecimalPlaces);
  }

  function onClick(event: SyntheticEvent): void {
    props.onRequestMicAccessClick();
  }

  return (
    <>
    { context.isMicAccessGranted ?
      <div>
        <div>Time Elapsed</div>
        <div className="txt--embiggen">{`${ formatElapseTime() }`}</div>
      </div>
      : 
      <div>
        <p>The first time you use this feature, you'll need to grant it access to your phone's microphone.</p>
        <button
          type="button" 
          className="button" 
          onClick={ onClick }>Click to enable audio</button>
      </div>
    }
    </>
  );
}
