import SettingsStore from "../components/features/Settings/SettingsStore";
import Units from "../enum/Units";
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
  const locale = settings.app.locale;
  const localizedStr = localizations.get(locale)[key] || '';

  if (localizedStr === '') {
    console.warn(`No localized string in ${locale} with key ${key}`);
  }

  return localizedStr;
}

export function getLocalizedDistanceUnit() {
  const units = settings.app.units;
  const localizedStrKey = units === Units.Imperial ? 'units.imperial.distance' : 'units.metric.distance';

  return getLocalizedStringByKey(localizedStrKey);
}

export function getLocalizedOffsetUnit() {
  const units = settings.app.units;
  const localizedStrKey = units === Units.Imperial ? 'units.imperial.offset' : 'units.metric.offset';

  return getLocalizedStringByKey(localizedStrKey);
}

export function applyLocaleLang(): void {
  document.documentElement.lang = settings.app.locale;
}
