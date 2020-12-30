import React from "react";

import A2HSButton from "./A2HSButton";
import Logo from "./Logo";
import MenuButton from "./MenuButton";

import "./app-bar.scss";

export default function AppBar() {
  return (
    <nav className="app-bar">
      <div className="app-bar__logo">
        <Logo height={"37px"} width={"37px"} />
      </div>
      <div className="app-bar__body">
        <h1 className="app-bar__title">{`${process.env.REACT_APP_NAME_STYLIZED}`}</h1>
      </div>
      <div className="app-bar__buttons">
        <A2HSButton />
        <MenuButton />
      </div>
    </nav>
  );
}
