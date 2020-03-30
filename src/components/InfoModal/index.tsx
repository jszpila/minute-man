import React, { useContext } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';
import { checkIfIsInstalled } from '../A2HSButton/a2hs';

export default function InfoModal() {
  const env = process.env;
  const context = useContext(AppContext);

  return (
    <Modal
      closeButtonText={'Got it'}
      onClose={context.updateShouldShowInfoModal}
      shouldShow={context.shouldShowInfoModal}>
        <div>
          <h3>About</h3>
          <p>A handy range utlility for zeroing your optic and stuff.</p>

          { !checkIfIsInstalled() &&
            <p>Click the download button to add it to the home screen of your phone, like an app!</p>
          }

          <p className="txt--muted">{`${env.REACT_APP_NAME} v${env.REACT_APP_VERSION} by ${env.REACT_APP_AUTHOR}`}</p>
        </div>
    </Modal>
  );
}
