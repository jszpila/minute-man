/**
 * Results
 * Display corrective instructions or errors w/ guidance as necessary
 */

import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";

import Modal from "../../../../Modal";
import { ClickulatorContext } from "../../context";
import Corrections from "./Corrections";
import Errors from "./Errors";

import "./results.scss";

export default function ResultsModal() {
  const context = useContext(ClickulatorContext);
  const shouldShow = context.shouldShowResultsModal;

  return (
    <Modal
      closeButtonText={<FormattedMessage id="buttons.ok" />}
      onClose={context.setShouldShowResultsModal}
      shouldShow={shouldShow}
    >
      {context.isValid ? <Corrections /> : <Errors />}
    </Modal>
  );
}
