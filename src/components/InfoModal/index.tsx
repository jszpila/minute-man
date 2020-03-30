import React, { useContext } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';

export default function InfoModal() {
  const env = process.env;
  const context = useContext(AppContext);

  // Determine the mobile OS to display instructions for install the PWA accordingly
  // https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
  function determineBrowser(): string {
      const userAgent = navigator.userAgent || navigator.vendor;
      let os = 'unknown';

    console.log(userAgent);
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      os = "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      os = "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      os = 'iOs'
    }

    return os;
  }
  return (
    <Modal
      closeButtonText={'Got it'}
      onClose={context.updateShouldShowInfoModal}
      shouldShow={context.shouldShowInfoModal}>
        <div>
          <div>{determineBrowser()}</div>
          <i className="txt--muted">
            {`${env.REACT_APP_NAME} v${env.REACT_APP_VERSION}`}
          </i>
        </div>
    </Modal>
  );
}
