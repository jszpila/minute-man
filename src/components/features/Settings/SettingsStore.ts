/**
 * Settings
 * Utility for accessing user-specified or default value of a setting
 */

import { LocalStorageKeys } from "../../../enum/LocalStorageKeys";
import { AppDefaultValues } from "../../../data/AppDefaults";
import { ClickulatorDefaultValues } from "../Clickulator/data/Defaults";

class AppSettingsStore {
  private static instance: AppSettingsStore;

  private constructor() {}

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
}

class ClickulatorSettingsStore {
  private static instance: ClickulatorSettingsStore;

  private constructor() {}

  static getInstance(): ClickulatorSettingsStore {
    if (!ClickulatorSettingsStore.instance) {
      ClickulatorSettingsStore.instance = new ClickulatorSettingsStore();
    }

    return ClickulatorSettingsStore.instance;
  }

  public get zeroAtDistance(): number {
    const localStorageValue = localStorage.getItem(LocalStorageKeys.ZeroAtDistance);
    return localStorageValue != null ? parseInt(localStorageValue) : ClickulatorDefaultValues.zeroAtDistance;
  }

  public set zeroAtDistance(value: number) {
    localStorage.setItem(LocalStorageKeys.ZeroAtDistance, value.toString());
  }

  public get opticAdjustmentIncrement(): number {
    const localStorageValue = localStorage.getItem(LocalStorageKeys.OpticAdjustmentIncrement);
    return localStorageValue != null ? Number(localStorageValue) : ClickulatorDefaultValues.opticAdjustmentIncrement;
  }

  public set opticAdjustmentIncrement(value: number) {
    localStorage.setItem(LocalStorageKeys.OpticAdjustmentIncrement, value.toString())
  }
}

export default class SettingsStore {
  private static instance: SettingsStore;
  private constructor() {}

  static getInstance(): SettingsStore {
    if (!SettingsStore.instance) {
      SettingsStore.instance = new SettingsStore();
    }

    return SettingsStore.instance;
  }

  public app = AppSettingsStore.getInstance();
  public clickulator = ClickulatorSettingsStore.getInstance();
}
