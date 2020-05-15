/**
 * Settings
 * Utility for accessing user-specified or default value of a setting
 */

import { AppDefaultValues } from "../../../data/AppDefaults";
import { LocalStorageKeys } from "../../../enum/LocalStorageKeys";
import ClickulatorDefaultValues from "../Clickulator/data/Defaults";

const defaults = ClickulatorDefaultValues;
class AppSettingsStore {
  private static instance: AppSettingsStore;

  static getInstance(): AppSettingsStore {
    if (!AppSettingsStore.instance) {
      AppSettingsStore.instance = new AppSettingsStore();
    }

    return AppSettingsStore.instance;
  }

  public get theme(): string {
    const localStorageValue = localStorage.getItem(LocalStorageKeys.Theme);
    return localStorageValue != null ? localStorageValue : AppDefaultValues.theme;
  }

  public set theme(value: string) {
    localStorage.setItem(LocalStorageKeys.Theme, value);
  }

  public get locale(): string {
    const localStorageValue = localStorage.getItem(LocalStorageKeys.Locale);
    return localStorageValue != null ? localStorageValue : AppDefaultValues.locale;
  }

  public set locale(value: string) {
    localStorage.setItem(LocalStorageKeys.Locale, value);
  }

  public get fontSize(): string {
    const localStorageValue = localStorage.getItem(LocalStorageKeys.FontSize);
    return localStorageValue != null ? localStorageValue : AppDefaultValues.fontSize;
  }

  public set fontSize(value: string) {
    localStorage.setItem(LocalStorageKeys.FontSize, value);
  }
}

class ClickulatorSettingsStore {
  private static instance: ClickulatorSettingsStore;

  static getInstance(): ClickulatorSettingsStore {
    if (!ClickulatorSettingsStore.instance) {
      ClickulatorSettingsStore.instance = new ClickulatorSettingsStore();
    }

    return ClickulatorSettingsStore.instance;
  }

  public get zeroAtDistance(): number {
    const localStorageValue = localStorage.getItem(LocalStorageKeys.ZeroAtDistance);
    return localStorageValue != null ? parseInt(localStorageValue) : defaults.zeroAtDistance;
  }

  public set zeroAtDistance(value: number) {
    localStorage.setItem(LocalStorageKeys.ZeroAtDistance, value.toString());
  }

  public get adjustmentIncrement(): number {
    const localStorageValue = localStorage.getItem(LocalStorageKeys.AdjustmentIncrement);
    return localStorageValue != null ? Number(localStorageValue) : defaults.adjustmentIncrement;
  }

  public set adjustmentIncrement(value: number) {
    localStorage.setItem(LocalStorageKeys.AdjustmentIncrement, value.toString())
  }
}

export default class SettingsStore {
  private static instance: SettingsStore;

  static getInstance(): SettingsStore {
    if (!SettingsStore.instance) {
      SettingsStore.instance = new SettingsStore();
    }

    return SettingsStore.instance;
  }

  public app = AppSettingsStore.getInstance();
  public clickulator = ClickulatorSettingsStore.getInstance();
}
