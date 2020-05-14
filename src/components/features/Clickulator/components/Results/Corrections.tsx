/**
 * Corrections
 * Display calibration instructions
 */

import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { ICorrectionResult } from '../../Calculator';
import { ClickulatorContext } from '../../context';

interface ICorrectionsListItemProps {
  correction: ICorrectionResult | undefined,
  offset: number | undefined,
}

// TODO: maybe use a HOC
function CorrectionsListItem(props: ICorrectionsListItemProps ) {
  const context = useContext(ClickulatorContext);
  let output = <></>; // Do not output anything if there is no correction or offset

  if (props.correction) {
    output = 
      <li>
        <FormattedMessage
          id="clickulator.correction"
          values={ props.correction } />
      </li>
  } else if (!props.correction && props.offset) {
    output =
      <li>
        <FormattedMessage
          id="clickulator.errors.withinOneMoa" 
          values={{
            offset: props.offset,
            distance: context.zeroAtDistance,
          }} />
      </li>
  }

  return output;  
}

export default function Corrections() {
  const context = useContext(ClickulatorContext);

  return (
    <>
      <h3 className="modal__heading">
        <i className="material-icons modal__heading__icon">build</i>
        <FormattedMessage id="clickulator.modal.title.success" />
      </h3>
      <ul className="feedback">
        <CorrectionsListItem
          correction={ context.corrections.horizontal }
          offset={ context.horizontalOffsetDistance } />
        <CorrectionsListItem
          correction={ context.corrections.vertical }
          offset={ context.verticalOffsetDistance } />
      </ul>
    </>
  );
}
