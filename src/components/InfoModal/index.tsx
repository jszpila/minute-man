import React, { useContext } from 'react';

import { AppContext } from '../../context/AppContext';
import GitInfo from '../../static/GitInfo';
import { isAppInstalled, isiOs } from '../AppBar/a2hsHelpers';
import Modal from '../Modal';
import Tabs from '../Tabs';
import { FormattedMessage } from 'react-intl';
import { getLocalizedStringByKey } from '../../util/L10n';

export default function InfoModal() {
  const env = process.env;
  const context = useContext(AppContext);
  const isStandAlone = window.matchMedia('(display-mode: standalone)').matches;

const AboutPanel = <>    
    <p><FormattedMessage id="info.about.blurb" /></p>

    { context.shouldShowInstallButton &&
      <p><FormattedMessage id="info.about.a2hs.android" /></p>
    }

    {/* iOS does not support A2HS functionality; provide manual instructions */}
    { isiOs() && !isAppInstalled() &&
      <>
        <p>
          <b><FormattedMessage id="info.about.a2hs.ios.title" /></b>
        </p>
        <ul>
          <li><FormattedMessage id="info.about.a2hs.ios.1" /></li>
          <li><FormattedMessage id="info.about.a2hs.ios.2" /></li>
          <li><FormattedMessage id="info.about.a2hs.ios.3" /></li>
        </ul>
      </>
    }
  </>;

  const DiagnosticsPanel = <table className="app-info">
      <tbody>
        <tr>
          <td className="app-info__key">
            <FormattedMessage id="info.diagnostics.version" />
          </td>
          <td className="app-info__value">{ `v${ env.REACT_APP_VERSION } (${ GitInfo.sha })` }</td>
        </tr>
        <tr>
          <td className="app-info__key">
            <FormattedMessage id="info.diagnostics.network" />
          </td>
          <td className="app-info__value">
            { navigator.onLine ? 
                <FormattedMessage id="info.diagnostics.network.connected" />
              : 
                <FormattedMessage id="info.diagnostics.network.notConnected" />
            }
          </td>
        </tr>
        <tr>
          <td className="app-info__key">
            <FormattedMessage id="info.diagnostics.mode" />
          </td>
          <td className="app-info__value">
            { isStandAlone ?
                <FormattedMessage id="info.diagnostics.mode.standalone" />
              : 
                <FormattedMessage id="info.diagnostics.mode.web" />
            }
          </td>
        </tr>
        <tr>
          <td className="app-info__key">
            <FormattedMessage id="info.diagnostics.platform" />
          </td>
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
      closeButtonText={ <FormattedMessage id="info.closeButton" /> }
      onClose={() => { context.setShouldShowInfoModal(false) }}
      shouldShow={ context.shouldShowInfoModal }>
        <Tabs
          tabNames={ [
            getLocalizedStringByKey('info.about.title'),
            getLocalizedStringByKey('info.diagnostics.title'),
          ] }
          tabContents={ [AboutPanel, DiagnosticsPanel] } />
    </Modal>
  );
}
