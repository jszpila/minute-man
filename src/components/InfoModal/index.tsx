import React, { useContext } from 'react';

import { AppContext } from '../../context/AppContext';
import GitInfo from '../../static/GitInfo';
import { isAppInstalled, isiOs } from '../AppBar/a2hsHelpers';
import Modal from '../Modal';
import Tabs from '../Tabs';

export default function InfoModal() {
  const env = process.env;
  const context = useContext(AppContext);
  const isStandAlone = window.matchMedia('(display-mode: standalone)').matches;

  const AboutPanel = <>    
    <p>{`${env.REACT_APP_DESCRIPTION}`}</p>

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

  const DiagnosticsPanel = <table className="app-info">
      <tbody>
        <tr>
          <td className="app-info__key">Version</td>
          <td className="app-info__value">{ `v${ env.REACT_APP_VERSION } (${ GitInfo.sha })` }</td>
        </tr>
        <tr>
          <td className="app-info__key">Network</td>
          <td className="app-info__value">{ `${ navigator.onLine ? 'connected' : 'not connected' }` }</td>
        </tr>
        <tr>
          <td className="app-info__key">Mode</td>
          <td className="app-info__value">{ isStandAlone ? 'standalone' : 'web' }</td>
        </tr>
        <tr>
          <td className="app-info__key">Platform</td>
          <td className="app-info__value">{ `${ navigator.platform }` }</td>
        </tr>
        {/* <tr>
          <td className="app-info__key">User Agent</td>
          <td className="app-info__value">{ `${ navigator.userAgent }` }</td>
        </tr> */}
      </tbody>
    </table>;

  return (
    <Modal
      closeButtonText={'Got it'}
      onClose={() => { context.setShouldShowInfoModal(false) }}
      shouldShow={ context.shouldShowInfoModal }>
        <Tabs
          tabNames={ ['About', 'Diagnostics'] }
          tabContents={ [AboutPanel, DiagnosticsPanel] } />
    </Modal>
  );
}
