import React from "react";
import { FormattedMessage } from "react-intl";
import Callout from "../Callout";

import "./globalwarning.scss";

export default function InfoModal() {
  return (
    <div id="GlobalWarning" role="status">
      <Callout iconId="mobile_friendly">
        <FormattedMessage id="app.warnings.orientation" />
      </Callout>
    </div>
  );
}
