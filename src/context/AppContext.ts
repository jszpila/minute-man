/**
 * Context
 * Datastore for Clickulator feature
 */

import React, { Dispatch, SetStateAction } from 'react';
import { AppDefaultValues } from '../data/AppDefaults';

export interface IAppContext {
  shouldShowInfoModal: boolean,
  updateShouldShowInfoModal: (Dispatch<SetStateAction<boolean>>),
  shouldShowInstallButton: boolean,
  updateShouldShowInstallButton: (Dispatch<SetStateAction<boolean>>),
  shouldShowMenu: boolean,
  updateShouldShowMenu: (Dispatch<SetStateAction<boolean>>),
}

const initialContext: IAppContext = {
  shouldShowInfoModal: AppDefaultValues.shouldShowInfoModal,
  updateShouldShowInfoModal: (): void => {},
  shouldShowInstallButton: AppDefaultValues.shouldShowInstallButton,
  updateShouldShowInstallButton: (): void => {},
  shouldShowMenu: AppDefaultValues.shouldShowMenu,
  updateShouldShowMenu: (): void => {},
}

export const AppContext = React.createContext(initialContext);
