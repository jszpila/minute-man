import React, { useContext } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';
import { isAppInstalled, isiOs } from '../AppBar/a2hsHelpers';
import GitInfo from '../../static/GitInfo';

export default function InfoModal() {
  const env = process.env;
  const context = useContext(AppContext);

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

          { context.shouldShowInstallButton &&
            <p>Click the install button to add it to the home screen of your phone, like an app!</p>
          }

          {/* iOS does not support A2HS functioanlity; provide manual instructions */}
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

          <p className="txt--muted">
            {`${env.REACT_APP_NAME} v${env.REACT_APP_VERSION} by ${env.REACT_APP_AUTHOR}`}<br/>
            {`${GitInfo.sha} / ${GitInfo.date}`}</p>
        </>
    </Modal>
  );
}
