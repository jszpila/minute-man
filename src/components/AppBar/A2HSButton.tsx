/**
 * A2HS: Add To Home Screen
 * Prompts for user to install app on phone
 * http://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
 * https://blog.anam.co/progressive-web-apps-with-create-react-app/                                                                                    
 */

import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useAddToHomescreenPrompt, isAppInstalled } from './a2hsHelpers';

export default function A2HSButton() {
  const context = useContext(AppContext);
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();

  useEffect(() => {
    const isInstalled = isAppInstalled();
    context.updateShouldShowInstallButton(!isInstalled && prompt !== null);
  }, [context, prompt]);

  return (
    <>
      { context.shouldShowInstallButton &&
        <button type="button"
          className="app-bar__button"
          onClick={promptToInstall}>
            <i className="material-icons">get_app</i>
        </button>
      }
    </>
  );
}
