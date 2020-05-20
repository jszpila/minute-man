import SettingsStore from "../components/features/Settings/SettingsStore";
import Units from "../enum/Units";
import enCopy from "../data/locale/en.json";
import esCopy from "../data/locale/es.json";
import plCopy from "../data/locale/pl.json"

type jsonData = {
  [key: string]: string;
}

const settings = SettingsStore.getInstance().app;

export const localizations = new Map<string, jsonData>([
  ['en', enCopy],
  ['es', esCopy],
  ['pl', plCopy],
]);

export function getLocalizedStringByKey(key: string) {
  const locale = settings.locale;
  const localizedCopy = localizations.get(locale) || enCopy;
  const localizedStr = localizedCopy[key] || '';

  if (localizations.get(locale) === undefined) {
    console.warn(`No locale copy found for [${locale}]; falling back to [en]`);
  }

  if (localizedStr === '') {
    console.warn(`No localized string in locale [${locale}] with key "${key}"`);
  }

  return localizedStr;
}

export function getLocalizedDistanceUnit() {
  const units = settings.units;
  const localizedStrKey = units === Units.Imperial ? 'units.imperial.distance' : 'units.metric.distance';

  return getLocalizedStringByKey(localizedStrKey);
}

export function getLocalizedOffsetUnit() {
  const units = settings.units;
  const localizedStrKey = units === Units.Imperial ? 'units.imperial.offset' : 'units.metric.offset';

  return getLocalizedStringByKey(localizedStrKey);
}

export function applyLocaleLang(): void {
  document.documentElement.lang = settings.locale;
}
