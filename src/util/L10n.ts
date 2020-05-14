import SettingsStore from "../components/features/Settings/SettingsStore";
import enCopy from "../data/locale/en.json";
import esCopy from "../data/locale/es.json";
import plCopy from "../data/locale/pl.json"

const settings = SettingsStore.getInstance();

// TODO make ILocalizedCopy, replace "any"
export const localizations = new Map<string, any>([
  ['en', enCopy],
  ['es', esCopy],
  ['pl', plCopy],
]);

export function getLocalizedStringByKey(key: string) {
  return localizations.get(settings.app.locale)[key] || '';
}

export function applyLocaleLang(): void {
  document.documentElement.lang = settings.app.locale;
}
