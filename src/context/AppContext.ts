/**
 * Context
 * Datastore for Clickulator feature
 */

import React, { Dispatch, SetStateAction } from 'react';

import AppDefaultValues from '../data/AppDefaults';

export interface IAppContext {
  locale: string,
  setLocale: (Dispatch<SetStateAction<string>>),
  fontSize: string,
  setFontSize: (Dispatch<SetStateAction<string>>),
  shouldShowInfoModal: boolean,
  setShouldShowInfoModal: (Dispatch<SetStateAction<boolean>>),
  shouldShowInstallButton: boolean,
  setShouldShowInstallButton: (Dispatch<SetStateAction<boolean>>),
  shouldShowMenu: boolean,
  setShouldShowMenu: (Dispatch<SetStateAction<boolean>>),
  theme: string,
  setTheme: (Dispatch<SetStateAction<string>>),
  units: string,
  setUnits: (Dispatch<SetStateAction<string>>),
}

const initialContext: IAppContext = {
  locale: AppDefaultValues.locale,
  setLocale: (): void => {},
  fontSize: AppDefaultValues.fontSize,
  setFontSize: (): void => {},
  shouldShowInfoModal: AppDefaultValues.shouldShowInfoModal,
  setShouldShowInfoModal: (): void => {},
  shouldShowInstallButton: AppDefaultValues.shouldShowInstallButton,
  setShouldShowInstallButton: (): void => {},
  shouldShowMenu: AppDefaultValues.shouldShowMenu,
  setShouldShowMenu: (): void => {},
  theme: AppDefaultValues.theme,
  setTheme: (): void => {},
  units: AppDefaultValues.units,
  setUnits: (): void => {},
}

export const AppContext = React.createContext(initialContext);
