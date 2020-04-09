import React, { useContext } from 'react';

import { AppContext } from '../../context/AppContext';
import GitInfo from '../../static/GitInfo';
import { isAppInstalled, isiOs } from '../AppBar/a2hsHelpers';
import Modal from '../Modal';
import Tabs from '../Tabs';

export default function InfoModal() {
  const env = process.env;
  const context = useContext(AppContext);

  const AboutPanel = <>    
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
  </>;

  const DiagnosticsPanel =
    <ul className="info-list">
      <li>{`${env.REACT_APP_NAME} v${env.REACT_APP_VERSION} ${GitInfo.sha}`}</li>
      <li>{`${navigator.onLine ? 'connected' : 'not connected'}`}</li>
      <li>{`${navigator.platform}`}</li>
      <li>{`${navigator.userAgent}`}</li>
    </ul>;

  return (
    <Modal
      closeButtonText={'Got it'}
      onClose={() => { context.updateShouldShowInfoModal(false) }}
      shouldShow={context.shouldShowInfoModal}>
        <Tabs
          tabNames={ ['About', 'Diagnostics'] }
          tabContents={ [AboutPanel, DiagnosticsPanel] } />
    </Modal>
  );
}
