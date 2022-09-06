/**
 *
 * Settings
 * App & feature settings
 *
 */

import React from "react";

import INavigationItem from "../../../interfaces/NavigationItem";
import DefaultLayout from "../../layouts/Default";
import AppSettings from "./components/AppSettings";
import ClickulatorSettings from "./components/ClickulatorSettings";
import { FormattedMessage } from "react-intl";
import Callout from "../../Callout";

export const SettingsNavConfig: INavigationItem = {
  route: "/settings",
  icon: "settings",
  displayNameKey: "settings.title",
};

export default function Settings() {
  return (
    <DefaultLayout>
      <form id="Settings" className="form">
        <Callout>
          <FormattedMessage id="settings.info" />
        </Callout>
        <AppSettings />
        <ClickulatorSettings />
      </form>
    </DefaultLayout>
  );
}
