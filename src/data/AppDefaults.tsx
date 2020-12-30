/**
 * Default values for App Context
 */

import Themes from "../enum/Themes";
import Units from "../enum/Units";
import FontSizeStyles from "../enum/FontSizeStyles";

const AppDefaultValues = {
  locale: navigator.language.split(/[-_]/)[0],
  fontSize: FontSizeStyles.Medium,
  shouldShowInfoModal: false,
  shouldShowInstallButton: false,
  shouldShowMenu: false,
  theme: Themes.Default,
  units: Units.Imperial,
};

export default AppDefaultValues;
