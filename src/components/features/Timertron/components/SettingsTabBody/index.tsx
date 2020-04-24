/**
 * SettingsTabBody
 */

import React from 'react';

import FeatureWithBottomButtonLayout from '../../../../layouts/FeatureWithBottomButtonLayout';
// import { TimertronConfig } from '../../context';
import { TimertronConfig } from '../../data/Config';
import { TimerMode } from '../../enum/TimerMode';

export default function SettingsTabBody() {
  // const context = useContext(TimertronContext);

  return (
    <form className="form">
      <FeatureWithBottomButtonLayout
        mainAreaContent={
          <fieldset className="form__fieldset">
            <div className="info-block info-block--margin-bottom--3x">
              <div className="info-block__label">Timer Mode</div>
              <select
                className="field__select"
                defaultValue={ TimertronConfig.timerMode }
                name='timerModeSelect'>
                <option value={ TimerMode.Comstock }>Comstock</option>
                <option value={ TimerMode.SplitTime }>Split Time</option>
                <option value={ TimerMode.ParTime }>Par Time</option>
              </select>
            </div>
          </fieldset>
        }
        buttonAreaContent={
          <div className="button-container">
            <button type="button" className="button button--primary">BUTTON!</button>
          </div>
        } />
    </form>
  );
}
