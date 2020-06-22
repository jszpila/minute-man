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
import { FormattedMessage } from 'react-intl';

export const SettingsNavConfig: INavigationItem = {
  route: '/settings',
  icon: 'settings',
  displayNameKey: 'settings.title',
};

export default function Settings(props: RouteComponentProps) {
  return (
    <DefaultLayout>
      <form
        id="Settings"
        className="form">
        <div className="b-callout">
          <i className="material-icons b-callout__icon">info</i>
          <p className="b-callout__blurb">
            <FormattedMessage id="settings.info" />
          </p>
        </div>
        <AppSettings />
        <ClickulatorSettings />
      </form>
    </DefaultLayout>
  );
}
