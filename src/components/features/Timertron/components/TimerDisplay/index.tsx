/**
 * TimerDisplay
 * Display current time elapsed
 * OR button to request microphone access
 */

import React, { SyntheticEvent, useContext } from 'react';

import { TimertronContext } from '../../context';
import { TimertronConfig } from '../../data/Config';
import { TimerMode } from '../../enum/TimerMode';

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
      <>
        <div className="info-block-flex-container">
          <div className="info-block info-block--flex--2">
            <div className="info-block__label">Time Elapsed</div>
            <div className="txt--embiggen--3x">{`${ formatElapseTime() }`}s</div>
          </div>
          { context.timerMode !== TimerMode.Comstock &&
            <>
              <div className="info-block info-block--flex--1">
                <div className="info-block__label">Shots</div>
                <div className="txt--embiggen--2x">4</div>
              </div>
              <div className="info-block info-block--flex--1">
                <div className="info-block__label">Split Time</div>
                <div className="txt--embiggen--2x">1.002s</div>
              </div>
            </>
          }
          </div>
          { context.timerMode !== TimerMode.Comstock &&
            <div className="info-block">
              <div className="info-block__label">Shot Times</div>
              <ol className="shot-list">
                <li>2.501s</li>
                <li>3.752s</li>
                <li>5.677s</li>
                <li>7.030s</li>
              </ol>
            </div>
          }
      </>
      : 
      <div>
        <p>The first time you use this feature, you'll need to grant it access to your phone's microphone.</p>
        <p>After clicking the button, you see a prompt asking to you "block" or "allow" microphone access; please select "allow".</p>
        <button
          type="button" 
          className="button button--primary" 
          onClick={ onClick }>Enable microphone access</button>
      </div>
    }
    </>
  );
}
