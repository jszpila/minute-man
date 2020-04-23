/**
 * Context
 * Datastore for Clickulator feature
 */

import React, { Dispatch, SetStateAction } from 'react';

import { AppDefaultValues } from '../data/AppDefaults';

export interface IAppContext {
  shouldShowInfoModal: boolean,
  setShouldShowInfoModal: (Dispatch<SetStateAction<boolean>>),
  shouldShowInstallButton: boolean,
  setShouldShowInstallButton: (Dispatch<SetStateAction<boolean>>),
  shouldShowMenu: boolean,
  setShouldShowMenu: (Dispatch<SetStateAction<boolean>>),
  theme: string,
  setTheme: (Dispatch<SetStateAction<string>>),
}

const initialContext: IAppContext = {
  shouldShowInfoModal: AppDefaultValues.shouldShowInfoModal,
  setShouldShowInfoModal: (): void => {},
  shouldShowInstallButton: AppDefaultValues.shouldShowInstallButton,
  setShouldShowInstallButton: (): void => {},
  shouldShowMenu: AppDefaultValues.shouldShowMenu,
  setShouldShowMenu: (): void => {},
  theme: AppDefaultValues.theme,
  setTheme: (): void => {},
}

export const AppContext = React.createContext(initialContext);
