/**
 *                    
 * Settings                                                              
 * App & feature settings
 *
 */

import { RouteComponentProps } from '@reach/router';
import React from 'react';

import INavigationItem from '../../../interfaces/NavigationItem';
import DefaultLayout from '../../layouts/Default';
import AppSettings from './components/AppSettings';
import ClickulatorSettings from './components/ClickulatorSettings';

export const SettingsNavConfig: INavigationItem = {
  route: '/settings',
  icon: 'settings',
  displayName: 'Settings',
};

export default function Settings(props: RouteComponentProps) {
  return (
    <DefaultLayout>
      <form
        id="Settings"
        className="form">
        <div className="b-callout">
          <i className="material-icons b-callout__icon">info</i>
          <p className="b-callout__blurb">Settings are saved and applied automatically.</p>
        </div>
        <AppSettings />
        <ClickulatorSettings />
      </form>
    </DefaultLayout>
  );
}
