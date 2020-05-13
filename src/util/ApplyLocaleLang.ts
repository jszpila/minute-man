import SettingsStore from "../components/features/Settings/SettingsStore";

export default function applyLocaleLang(): void {
  document.documentElement.lang = SettingsStore.getInstance().app.locale.split('-')[0];
}
