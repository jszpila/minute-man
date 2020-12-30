import React from "react";
import { FormattedMessage } from "react-intl";

import "./field-label-hint.scss";

interface IProps {
  messageId: string;
  hintText: string | React.ReactNode;
}

export default function FieldLabelWithHint(props: IProps) {
  return (
    <>
      <FormattedMessage id={props.messageId} />
      <i className="field__label__hint txt--smaller txt--muted">
        ({props.hintText})
      </i>
    </>
  );
}
