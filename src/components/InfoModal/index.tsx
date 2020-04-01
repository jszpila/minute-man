import React, { useContext } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';
import { checkIfIsInstalled } from '../AppBar/a2hsHelpers';
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

          { !checkIfIsInstalled() &&
            <p>Click the download button to add it to the home screen of your phone, like an app!</p>
          }

          <p className="txt--muted">
            {`${env.REACT_APP_NAME} v${env.REACT_APP_VERSION} by ${env.REACT_APP_AUTHOR}`}<br/>
            {`${GitInfo.sha} / ${GitInfo.date}`}</p>
        </>
    </Modal>
  );
}
