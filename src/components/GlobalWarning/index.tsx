

import React from 'react';
import { FormattedMessage } from 'react-intl';

import './globalwarning.scss'

export default function InfoModal() {
  return (
    <div id="GlobalWarning" role="status" className="b-callout">
      <i className="material-icons b-callout__icon">info</i>
      <p className="b-callout__blurb">
        <FormattedMessage id="globalwarning" />
      </p>
    </div>
  );
}
