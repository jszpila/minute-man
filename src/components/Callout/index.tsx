import React from "react";

import "./callout.scss";

interface IProps {
  children: React.ReactNode;
  iconId?: string;
}

export default function Callout(props: IProps) {
  return (
    <div className="callout">
      <i className="material-icons callout__icon">{props.iconId}</i>
      <p className="callout__blurb">{props.children}</p>
    </div>
  );
}

Callout.defaultProps = {
  iconId: "info",
};
