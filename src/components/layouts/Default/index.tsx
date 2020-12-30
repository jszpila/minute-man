import React from "react";

import "./default-layout.scss";

interface IProps {
  children: React.ReactNode;
}

export default function DefaultLayout(props: IProps) {
  return <div className="layout-default">{props.children}</div>;
}
