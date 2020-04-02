import React, { useContext, useState, SyntheticEvent } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';
import { isAppInstalled, isiOs } from '../AppBar/a2hsHelpers';
import GitInfo from '../../static/GitInfo';

import './infomodal.css';

export default function InfoModal() {
  const env = process.env;
  const context = useContext(AppContext);
  const [shouldShowDiagnotics, updateShouldShowDiagnotics] = useState(false);

  function onToggleDiagnostics(event: SyntheticEvent): void {
    event.preventDefault();
    event.stopPropagation();
    updateShouldShowDiagnotics(!shouldShowDiagnotics);
  }

  return (
    <Modal
      closeButtonText={'Got it'}
      onClose={context.updateShouldShowInfoModal}
      shouldShow={context.shouldShowInfoModal}>
        <>
          <h3 className="modal__heading">
            <i className="material-icons modal__heading__icon">info</i> 
            About</h3>
          
          <p>{`${env.REACT_APP_DESCRIPTION}`}</p>

          {/* TODO: break into own component? */}
          { context.shouldShowInstallButton &&
            <p>Click the install button to add it to the home screen of your phone, like an app!</p>
          }

          {/* iOS does not support A2HS functionality; provide manual instructions */}
          { isiOs() && !isAppInstalled() &&
            <p>
              <b>Add MinuteMan to your homescreen so you can use it like an app!</b>
              <ul>
                <li>Click the "share" button</li>
                <li>Click "Add to Home Screen"</li>
                <li>Click "Add" at the top</li>
              </ul>
            </p>
          }

          {/* TODO: break into component */}
          <div className="diag-info txt--muted">
            <button type="button"
              className="toggle-diag-info-button"
              onClick={onToggleDiagnostics}>
              Diangostics
              <i className="material-icons">{`${shouldShowDiagnotics ? "expand_less" : "expand_more"}`}</i>
            </button>
            <div className={`diag-info__body ${shouldShowDiagnotics ? "diag-info__body--active" : ""}`}>
              <dl className="info">
                <dt className="info-label">App</dt>
                <dd className="info-value">
                  {`${env.REACT_APP_NAME} v${env.REACT_APP_VERSION} by ${env.REACT_APP_AUTHOR}`}</dd>
                <dt className="info-label">Build</dt>
                <dd className="info-value">{`${GitInfo.sha} / ${GitInfo.date}`}</dd>
                <dt className="info-label">Client</dt>
                <dd className="info-value">
                  <ul className="info-list">
                    <li>
                      <span className="info-label">Platform</span> 
                      {`${navigator.platform}`}</li>
                    <li><span className="info-label">User Agent</span>
                      {`${navigator.userAgent}`}</li>
                    <li><span className="info-label">Connected</span>
                      {`${navigator.onLine}`}</li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
        </>
    </Modal>
  );
}
